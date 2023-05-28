import Empty from '../../../assets/img/Empty Cart.png';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonGroup from '../../../components/ButtonGroup';
import Search from '../../../components/Search';

export default function Pesanan() {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 4;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = itemList.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(itemList.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const [search, setSearch] = useState([]);

  const buttons = [
    'Semua',
    'Belum Bayar',
    'Dikemas',
    'Dikirim',
    'Selesai',
    'Dibatalkan',
  ];

  const columns = [
    { header: 'No.' },
    { header: 'No. Resi' },
    { header: 'Nama Item' },
    { header: 'Nama Pembeli' },
    { header: 'Order Total' },
    { header: 'Order Date' },
    { header: 'Status' },
    { header: 'Action' },
  ];

  const pesanan = [
    {
      id: 1,
      NoResi: 'RESI001',
      NamaItem: 'Tas Tote',
      NamaPembeli: 'John Doe',
      OrderTotal: 'Rp 500.000,-',
      OrderDate: '2023-05-15',
      Status: 'Sudah Dibayar',
    },
    {
      id: 2,
      NoResi: 'RESI002',
      NamaItem: 'Dompet',
      NamaPembeli: 'Jane',
      OrderTotal: 'Rp 300.000,-',
      OrderDate: '2023-01-15',
      Status: 'Belum Bayar',
    },
    {
      id: 3,
      NoResi: 'RESI003',
      NamaItem: 'Tas Tote',
      NamaPembeli: 'Mike',
      OrderTotal: 'Rp 500.000,-',
      OrderDate: '2023-02-13',
      Status: 'Selesai',
    },
    {
      id: 4,
      NoResi: 'RESI003',
      NamaItem: 'Tas Tote',
      NamaPembeli: 'Mike',
      OrderTotal: 'Rp 500.000,-',
      OrderDate: '2023-02-13',
      Status: 'Belum Bayar',
    },
    {
      id: 5,
      NoResi: 'RESI003',
      NamaItem: 'Tas Tote',
      NamaPembeli: 'Mike',
      OrderTotal: 'Rp 500.000,-',
      OrderDate: '2023-02-13',
      Status: 'Dikirim',
    },
  ];

  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };

  useEffect(() => {
    setItemList(pesanan);
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getDataStatus = (e) => {
    console.log(e.target.name);
  };

  return (
    <div className="flex-row px-5 py-10">
      {/* header */}
      <div className="text-h5 mb-2">Pesanan</div>
      <div className="text-p3 text-gray-500">
        Pantau pesanan EcoWave di halaman ini
      </div>

      {/* Search */}
      <div className="mt-7">
        <Search
          id="search-pesanan"
          placeholder="Masukan ID"
          onChange={handleChange}
        />
      </div>

      {/* Button grub */}
      <div className="space-x-1 text-p3 mt-7 border-b-2 inline-flex border-b-green-500">
        <ButtonGroup buttons={buttons} getData={getDataStatus} />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto mt-3">
        <table className="w-full text-p4 text-left text-black">
          <thead className="text-p3 text-white bg-green-500 ">
            <tr>
              {records.length >= 1 &&
                columns.map((head, i) => (
                  <th
                    key={i}
                    className="py-[14px] px-[10px] text-p2 font-medium"
                  >
                    {head.header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {itemList &&
              records.map((item, i) => (
                <tr key={i} className="even:bg-gray-50 ">
                  <th scope="row" className="text-center font-normal">
                    {i + 1}
                  </th>
                  <td className="py-[18px] px-[10px]">{item.NoResi}</td>
                  <td className="py-[18px] px-[10px]">{item.NamaItem}</td>
                  <td className="py-[18px] px-[10px]">{item.NamaPembeli}</td>
                  <td className="py-[18px] px-[10px]">{item.OrderTotal}</td>
                  <td className="py-[18px] px-[10px]">{item.OrderDate}</td>
                  <td className="py-[18px] px-[10px]">{item.Status}</td>
                  <td className="py-[18px] px-[10px] text-center flex space-x-2 justify-center">
                    <Link to={'/admin/pesanan/detail'}>
                      <EyeIcon className="w-5 h-5 text-green-500" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        {records.length >= 1 && (
          <div className="flex justify-between w-full pb-2">
            <div>
              <p className="text-p2 font-normal px-5 py-3 text-gray-500">{`Halaman ${currentPage} dari ${nPage}`}</p>
            </div>
            <nav>
              <ul className="list-style-none flex">
                <li>
                  <a
                    className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold  ${
                      currentPage === 1 ? 'text-gray-300' : 'text-green-500'
                    }`}
                    onClick={prevPage}
                  >
                    Previous
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li key={i}>
                    <p
                      className={`cursor-pointer relative block px-5 py-3 text-p2 font-semibold rounded-full text-green-500 ${
                        currentPage === n
                          ? 'bg-green-500 text-white'
                          : 'bg-green-50'
                      }`}
                      onClick={() => changePage(n)}
                    >
                      {n}
                    </p>
                  </li>
                ))}

                <li>
                  <a
                    className="cursor-pointer relative block px-5 py-3 text-p2 font-semibold text-green-500 "
                    onClick={nextPage}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
        {/* Empty */}
        {records.length == 0 && (
          <div className="py-20">
            <img src={Empty} className="h-80 mx-auto" />
            <p className="text-p3 font-semibold text-gray-500 text-center">
              Pesanan Kosong
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
