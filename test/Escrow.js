const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
    let buyer, seller, inspector, lender
    let realEstate, escrow

    beforeEach(async () => {
        //Setup Accounts
        [buyer, seller, inspector, lender] = await ethers.getSigners()

        //Deploy Real Estate
        const RealEstate = await ethers.getContractFactory('RealEstate')
        realEstate = await RealEstate.deploy()

        //Mint 
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmQVcpsjrA6crliJjZAodYwmPekYgnnXGo4DFubJiLc2EB/1.json")
        await transaction.wait()

        const Escrow = await ethers.getContractFactory('Escrow')
        escrow = await Escrow.deploy(
            realEstate.address,
            seller.address,
            inspector.address,
            lender.address
        )

    })

    describe('Deployment', () => {
        it('Returns NFT address', async () => {
            const results = await escrow.nftAddress()
            expect(results).to.be.equal(realEstate.address)
        })

        it('Returns seller address', async () => {
            const results = await escrow.seller()
            expect(results).to.be.equal(seller.address)
        })

        it('Returns inspector address', async () => {
            const results = await escrow.inspector()
            expect(results).to.be.equal(inspector.address)
        })

        it('Returns lender address', async () => {
            const results = await escrow.lender()
            expect(results).to.be.equal(lender.address)
        })
    })

})
