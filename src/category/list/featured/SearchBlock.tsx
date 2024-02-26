import { Select, Space } from "antd";
import Search from "antd/es/input/Search";
import { ICategorySearch } from "../types";

interface ISearchBlockParams {
    searchParams: URLSearchParams,
    setSearch: React.Dispatch<React.SetStateAction<ICategorySearch>>
}

const SearchBlock: React.FC<ISearchBlockParams> = (props) => {
    const { searchParams, setSearch } = props;

    const handleChange = (value: string) => {
        console.log(searchParams.get("sort"))
        searchParams.set("name", value);
        setSearch({
            name: value,
            page: Number(searchParams.get("page")) || 1,
            size: Number(searchParams.get("size")) || 2,
            sort: searchParams.get("sort") || ""
        })
    }

    const handleSortChange = (value: string) => {
        searchParams.set("sort", value);
        setSearch({
            name: searchParams.get("name") || "",
            page: Number(searchParams.get("page")) || 1,
            size: Number(searchParams.get("size")) || 2,
            sort: value
        })
    };

    return (
        <>
            <Space.Compact>
                <Search onChange={(e) => handleChange(e.target.value)} placeholder="input search text" allowClear />
            </Space.Compact>
            <Select
                defaultValue="name"
                style={{ width: 120 }}
                onChange={handleSortChange}
                options={[
                    { value: 'id', label: 'Id' },
                    { value: 'name', label: 'Name' },
                    { value: 'description', label: 'Description' }
                ]}
            />
        </>
    );
}

export default SearchBlock;