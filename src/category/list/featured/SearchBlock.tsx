import { Select, Space } from "antd";
import Search from "antd/es/input/Search";
import { ICategorySearch } from "../types";

interface ISearchBlockParams {
    searchParams: URLSearchParams,
    setSearch: React.Dispatch<React.SetStateAction<ICategorySearch>>
}

const sortOptions = [
    { value: 'id', label: 'Id' },
    { value: 'name', label: 'Name' },
    { value: 'description', label: 'Description' }
]

const SearchBlock: React.FC<ISearchBlockParams> = (props) => {
    const { searchParams, setSearch } = props;

    const handleSearchChange = (value: string) => {
        searchParams.set("name", value);
        setSearchBySearchParams();
    }

    const handleSortChange = (value: string) => {
        searchParams.set("sort", value);
        setSearchBySearchParams();
    };

    const setSearchBySearchParams = () => {
        setSearch({
            name: searchParams.get("name") || "",
            page: Number(searchParams.get("page")) || 1,
            size: Number(searchParams.get("size")) || 2,
            sort: searchParams.get("sort") || ""
        })
    }

    return (
        <>
            <Space.Compact>
                <Search onChange={(e) => handleSearchChange(e.target.value)} placeholder="input search text" allowClear />
            </Space.Compact>
            <Select
                defaultValue="name"
                style={{ width: 120 }}
                onChange={handleSortChange}
                options={sortOptions}
            />
        </>
    );
}

export default SearchBlock;