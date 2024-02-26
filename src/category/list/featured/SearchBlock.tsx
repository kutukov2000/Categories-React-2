import { Space } from "antd";
import Search from "antd/es/input/Search";
import { ICategorySearch } from "../types";

interface ISearchBlockParams {
    searchParams: URLSearchParams,
    setSearch: React.Dispatch<React.SetStateAction<ICategorySearch>>
}

const SearchBlock: React.FC<ISearchBlockParams> = (props) => {
    const { searchParams, setSearch } = props;

    const handleChange = (value: string) => {
        setSearch({
            name: value,
            page: Number(searchParams.get("page")) || 1,
            size: Number(searchParams.get("size")) || 2
        })
    }

    return (
        <>
            <Space.Compact>
                <Search onChange={(e) => handleChange(e.target.value)} placeholder="input search text" allowClear />
            </Space.Compact>
        </>
    );
}

export default SearchBlock;