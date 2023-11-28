const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CHUToken.sol -> test", () => {
    let chu;
    let decimals;
    
    let owner;
    let alice;
    let bob;

    beforeEach(async () => {
        [owner, alice, bob] = await ethers.getSigners();

        const CHU = await ethers.getContractFactory("CHUToken");
        decimals = 18;
        chu = await CHU.deploy(decimals);

        await chu.deployed();
    });

    describe("decimals", () => {
        it("Should return decimals", async () => {
            expect(await chu.decimals()).to.be.equal(decimals);
        });
    });

    describe("mint", () => {
        it("Should mint properly", async () => {
            const amount = ethers.utils.parseUnits("10.0", decimals);
            await chu.connect(owner).mint(amount);

            expect(await chu.balanceOf(owner.address)).to.be.equal(amount);
        });

        it("Should fail to mint (msg.sender is not an owner)", async () => {
            const amount = ethers.utils.parseUnits("10.0", decimals);
            await expect(chu.connect(alice).mint(amount))
                .to.be.revertedWith("CHU: msg.sender in not an owner");
        });
    });

    describe("burn", () => {
        it("Should burn properly", async () => {
            const amount = ethers.utils.parseUnits("10.0", decimals);

            await chu.connect(owner).mint(amount);
            expect(await chu.balanceOf(owner.address)).to.be.equal(amount);

            await chu.connect(owner).burn(amount);
            expect(await chu.balanceOf(owner.address)).to.be.equal(0);
        });

        it("Should fail to mint (msg.sender is not an owner)", async () => {
            const amount = ethers.utils.parseUnits("10.0", decimals);
            await expect(chu.connect(alice).burn(amount))
                .to.be.revertedWith("CHU: msg.sender in not an owner");
        });
    });

    describe("approve", () => {
        it("Should fail to approve (CHU: paused)", async () => {
            await chu.connect(owner).pause();

            const amount = ethers.utils.parseUnits("10.0", decimals);
            await expect(chu.connect(alice).approve(bob.address, amount))
                .to.be.revertedWith("CHU: paused");
        });
    });

    describe("transfer", () => {
        it("Should transfer properly", async () => {
            const amount = ethers.utils.parseUnits("10.0", decimals);
            await chu.connect(owner).mint(amount);

            expect(await chu.balanceOf(owner.address)).to.be.equal(amount);

            expect(await chu.balanceOf(alice.address)).to.be.equal(0);
            await chu.transfer(alice.address, amount);

            expect(await chu.balanceOf(alice.address)).to.be.equal(amount);
        });

        it("Should fail to transfer (blacklisted address)", async () => {
            await chu.connect(owner).addToBlacklist(alice.address);

            const amount = ethers.utils.parseUnits("10.0", decimals);
            await chu.connect(owner).mint(amount);

            await expect(chu.transfer(alice.address, amount))
                .to.be.revertedWith("CHU: token transfer with blacklisted account");
        });

        it("Should fail to transfer (paused)", async () => {
            const amount = ethers.utils.parseUnits("10.0", decimals);
            await chu.connect(owner).mint(amount);

            await chu.connect(owner).pause(); 

            await expect(chu.transfer(alice.address, amount))
                .to.be.revertedWith("CHU: paused");
        });
    });
});

