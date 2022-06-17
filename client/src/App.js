import React, {useEffect, useState} from "react";
import './App.css';
import {getData} from "./services/services";
import TableFruit from "./components/table-fruit";
import PaginationTable from "./components/pagination-table";

function App() {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [tablePage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [valueSort, setValueSort] = useState('default');

    useEffect(() => {
        const fetchTable = async () => {
            setLoading(true)
            const response = await getData()
            setData(response.data)
            setLoading(false)
        }
        fetchTable()
    }, [])


    // get current tables
    const indexOfLastPage = currentPage * tablePage;
    const indexOfFirstPage = indexOfLastPage - tablePage;
    const currentTables = data.slice(indexOfFirstPage, indexOfLastPage);

    const paginate = (number) => setCurrentPage(number);

    // sorting titles data table
    const handleSortingTitle = (value) => {
        const sorting = value;
        const sortData = data.sort((a, b) => {
            if (sorting === 'default') {
                return  a.id - b.id
            }
            if (sorting === 'up') {
                return a.title > b.title ? 1 : -1
            }
            if (sorting === 'down') {
                return a.title < b.title ? 1 : -1
            }
        })
        setValueSort(sorting)
        setData(sortData)
    }
    // sorting amounts data table
    const handleSortingAmount = (value) => {
        const sorting = value;
        const sortData = data.sort((a, b) => {
            if (sorting === 'default') {
                return a.id - b.id
            }
            if (sorting === 'up') {
                return a.amount - b.amount
            }
            if (sorting === 'down') {
                return b.amount - a.amount
            }
        })
        setValueSort(sorting)
        setData(sortData)
    }

    return (
        <div className="app">
            <div className="container ">
                <h1 style={{textAlign: 'center'}}>Фрукты</h1>
                <TableFruit
                    handleSortingAmount={handleSortingAmount}
                    handleSortingTitle={handleSortingTitle}
                    valueSort={valueSort}
                    data={currentTables}/>
                <PaginationTable
                    tablePage={tablePage}
                    totalPage={data.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
}

export default App;
