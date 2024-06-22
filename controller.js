import { createNft, createTran, read1Nft, readAllNft, updateOwner, updateSold } from "./CRUD.js";
import uploadImageFireBase from "./upload.js";

export const getMarket = async (req, res) => {
    try {
        const results = await readAllNft()
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const get1Nft = async (req, res) => {
    const id = req.query.itemId
    const results = await read1Nft(id)
    try {
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const postMarket = async (req, res) => {
    const nftname = req.body.nftname
    const owner = req.body.owner
    const price = req.body.price
    const key = req.body.key
    const sold = req.body.sold
    try {
        const image = await uploadImageFireBase(req.file);
        await createNft(nftname, owner, price, image, key, sold)
        return res.status(200).json({
            massege: 'ok',
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const putSold = async (req, res) => {
    const itemId = req.body.itemId
    const sold = req.body.sold
    try {
        await updateSold(sold, itemId)
        return res.status(200).json({
            massege: 'ok',
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const putOwner = async (req, res) => {
    const itemId = req.body.itemId
    const owner = req.body.owner
    try {
        await updateOwner(owner, itemId)
        return res.status(200).json({
            massege: 'ok',
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const postTran = async (req, res) => {
    const itemId = req.body.itemId
    const buyer = req.body.buyer
    const amount = req.body.amount
    const transactionDate = req.body.transactionDate
    try {
        await createTran(itemId, buyer, amount, transactionDate)
        await updateOwner(buyer, itemId)
        await updateSold(0, itemId)
        return res.status(200).json({
            massege: 'ok',
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

