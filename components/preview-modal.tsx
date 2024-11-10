"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Gallery from "@/components/gallery";
import ProductInfo from "@/components/product-info";
import Modal from "@/components/ui/modal";


const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return ( 
    <Modal 
      open={previewModal.isOpen} 
      onClose={previewModal.onClose}

    >
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <ProductInfo data={product} />
        </div>
      </div>
    </Modal>
  );
}
 
export default PreviewModal;
