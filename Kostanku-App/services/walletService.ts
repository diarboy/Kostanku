import { ResponseType, WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import { collection, deleteDoc, doc, Firestore, setDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";

export const createOrUpdateWallet = async(
    walletData: Partial<WalletType>
): Promise<ResponseType> => {
    try {
        let walletToSave = { ...walletData };

        if (walletData.image && walletData?.image?.uri) {
            const imageUploadRes = await uploadFileToCloudinary(
                walletData.image,
                "wallets"
            );
            if (!imageUploadRes.success) {
                return {
                    success: false,
                    msg: imageUploadRes.msg || "Failed to upload wallet icon",
                };
            }

            const publicId = imageUploadRes.data?.split('/').slice(-2).join('/').replace(/\.\w+$/, '');

            walletToSave.image = imageUploadRes.data;
            walletToSave.imagePublicId = publicId;
        }
        
        const walletRef = walletData?.id ?
            doc(firestore, "wallets", walletData?.id)
            : doc(collection(firestore, "wallets"));

        if (!walletData?.id) {
            walletToSave.amount = 0;
            walletToSave.totalIncome = 0,
            walletToSave.totalExpenses = 0;
            walletToSave.created = new Date();
        }

        await setDoc(walletRef, walletToSave, { merge: true })
        return { success: true, data: { ...walletToSave, id: walletRef.id } };
        
    } catch (error: any) {
        console.log("error creating or updating wallet: ", error);
        return { success: false, msg: error.message }
    }
}

export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
    try {
        const walletRef = doc(firestore, "wallets", walletId);
        await deleteDoc(walletRef);
        return {success: true, msg: "Wallet deleted succesfully"}
    } catch (err: any) {
        console.log('error deleting wallet: ', err);
        return { success: false, msg: err.message}
    }
}