import { Button, Modal } from "flowbite-react";

export default function TambahKategoriModal({ handleCloseModal, showModal }) {
    return (
        <Modal onClose={handleCloseModal} show={showModal}>
            <Modal.Header>Tambah Kategori</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <p>
                            With less than a month to go before the European
                            Union enacts new consumer privacy laws for its
                            citizens, companies around the world are updating
                            their terms of service agreements to comply.
                        </p>
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <p>
                            The European Union’s General Data Protection
                            Regulation (G.D.P.R.) goes into effect on May 25 and
                            is meant to ensure a common set of data rights in
                            the European Union. It requires organizations to
                            notify users as soon as possible of high-risk data
                            breaches that could personally affect them.
                        </p>
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex flex-row gap-2 items-center justify-end ml-auto">
                    <Button color="gray" onClick={handleCloseModal}>
                        <p>Decline</p>
                    </Button>
                    <button
                        className="px-4 py-[10px] text-p3 text-white bg-[#059669] font-semibold rounded-full disabled:text-green-300   disabled:bg-green-300 duration-100 hover:bg-green-600 active:border-2 
                    active:border-green-300"
                        onClick={handleCloseModal}
                    >
                        I accept
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
