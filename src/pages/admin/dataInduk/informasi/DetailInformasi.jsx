import {
    BookmarkIcon,
    ChevronLeftIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const content = {
    judul: "5 Kebiasaan Eco-Friendly buat Jaga Bumi",
    tanggal_terbit: "5 Mei 2023",
    bookmark: 50,
    watch: 50,
    deskripsi: `<p>Jakarta - Bumi yang kita tinggali beserta lingkungan di dalamnya kian hari makin terancam dengan pertumbuhan populasi manusia yang tiada henti. Namun, tanpa disadari kebiasaan masyarakat sehari-hari juga berkontribusi membuat kondisi bumi makin terancam dampak iklim.Untuk itu, kamu perlu melakukan perubahan agar dapat menjaga bumi demi keberlangsungan generasi masa depan. Tak perlu melakukan aksi besar, beberapa kebiasaan eco-friendly di rumah juga bisa membantu menjaga bumi agar tetap menjadi tempat nyaman untuk ditempati.Ingin tahu apa saja kebiasaan eco-friendly tersebut? Simak 5 hal penting berikut</p>

    <p>&nbsp;</p>
    
    <ol>
        <li><strong>Kurangi Sampah Makanan</strong></li>
    </ol>
    
    <p>Mungkin tak banyak dari Anda yang sadar bahwa limbah makanan merupakan salah satu masalah terbesar dalam hal keberlanjutan. Selain membuang-buang uang, makanan yang terbuang juga menjadi tanda terbuangnya sumber daya yang digunakan untuk memproduksi dan mengangkut makanan, baik itu air, tenaga kerja, hingga berbagai energi lainnya.Baca artikel wolipop, &quot;5 Kebiasaan Eco-Friendly buat Jaga Bumi, Mudah Diterapkan di Rumah</p>
    
    <p>&nbsp;</p>
    
    <ol start="2">
        <li><strong>Hindari Penggunaan Plastik</strong></li>
    </ol>
    
    <p>Penggunaan plastik sekali pakai sejak lama telah berkontribusi terhadap menumpuknya sampah yang tak dapat terurai. Untuk mengurangi dampaknya, Anda dapat memulai kebiasaan sederhana dari rumah. Mulai dari membawa botol air minum dari rumah saat bepergian daripada membeli air mineral botolan terus menerus, menggunakan kain serbet atau lap sisa saat ingin mengeringkan tangan atau piring dibandingkan memakai tisu dalam jumlah banyak.Baca artikel wolipop, &quot;5 Kebiasaan Eco-Friendly buat Jaga Bumi, Mudah Diterapkan di Rumah&quot;&nbsp;</p>
    `,
};

export default function DetailInformasi() {
    // const toolbarOptions = [];

    return (
        <div>
            {/* back button */}
            <div className="flex flex-row row-gap items-center gap-6 ml-4 sm:ml-[44px] mt-8">
                <Link to="/admin/informasi/">
                    <ChevronLeftIcon className="w-5 h-5 text-green-500" />
                </Link>
                <h6 className="text-h6 font-medium">Detail Informasi</h6>
            </div>

            {/* blog content */}
            <div className="sm:ml-[44px] sm:mr-8 mx-4">
                <h5 className="text-h5 font-bold mt-12 mb-4">
                    {content.judul}
                </h5>

                <div className="text-p3 text-gray-500">
                    by EcoWave &nbsp; | &nbsp; {content.tanggal_terbit}
                </div>

                <div className="flex flex-row gap-8 py-[19px] my-8 border-gray-300 border-y pl-5">
                    <div className="flex flex-row gap-[9px] items-center ">
                        <BookmarkIcon className="w-[14px] h-[18px] text-gray-500" />
                        <p className="text-p3 text-gray-500">
                            {content.bookmark}
                        </p>
                    </div>
                    <div className="flex flex-row gap-[9px] items-center ">
                        <EyeIcon className="w-[14px] h-[18px] text-gray-500" />
                        <p className="text-p3 text-gray-500">{content.watch}</p>
                    </div>
                </div>

                <div className=" max-w-[640px] mx-auto">
                    <img
                        className=" object-cover max-h-[420px] w-full"
                        src="https://source.unsplash.com/nOFumlIRbq0"
                        alt="Gambar Unsplash"
                    />
                </div>

                <div
                    className="my-list my-8"
                    dangerouslySetInnerHTML={{ __html: content.deskripsi }}
                />
            </div>
        </div>
    );
}
