import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Table.css';

const ROS = [
    {
        id: '1',
        implantdate: 'Nov 27th, 2023',
        impedance: '300,400,550',
        battery: 'ON',
        imagepath: 'images/10-25-2024.jpeg'

    },
    {
        id: '2',
        implantdate: 'Nov 23rd, 2023',
        impedance: '300,400,550',
        battery: 'ON',
        imagepath: 'images/10-25-2024.jpeg'
    }
]

for (let i = 3; i < 100; i++) {
    ROS.push({
        id: i,
        implantdate: `Jan ${i}th, 2021`,
        impedance: '300,400,550',
        battery: 'ON',
        imagepath: 'images/10-25-2024.jpeg'
    });
}

const Table = ({ rows = ROS }) => {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [_, setData] = useState([]);

    const fetchData = async () => {
        const response = await fetch('https://localhost:8000/api/images/allimages');
        if (response.ok) {
            const data = await response.json();
            setData(data);
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <button onClick={fetchData}>Refresh</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Implant Date</th>
                        <th>Impedance</th>
                        <th>Battery</th>
                        <th>ImagePath</th>
                    </tr>
                </thead>
                <tbody>
                    {(/*data ||*/ rows).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.implantdate}</td>
                            <td>{row.impedance}</td>
                            <td>{row.battery}</td>
                            <td>{row.imagepath}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handleChangePage(page - 1)} disabled={page === 0}>
                    Previous
                </button>
                <span>Page {page + 1}</span>
                <button onClick={() => handleChangePage(page + 1)} disabled={page >= Math.ceil((/*data || */rows).length / rowsPerPage) - 1}>
                    Next
                </button>
                <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                </select>
            </div>

            <div className="button-container">
                <button onClick={() => navigate("/About")} className="button retake">
                    Back to About
                </button>
            </div>
        </div>
    );
};

export default Table;
