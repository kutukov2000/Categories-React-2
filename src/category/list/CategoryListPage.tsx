import { useEffect, useState } from "react";
import { ICategorySearch, IGetCategories } from "./types";
import { Col, Pagination, Row } from "antd";
import http_common from "../../http_common";
import CategoryCard from "./CategoryCard";
import { useSearchParams } from "react-router-dom";

const CategoryListPage = () => {

    const [searchResult, setSearchResult] = useState<IGetCategories>({
        content: [], //categories list
        totalElements: 0
    });

    const { content, totalElements } = searchResult;

    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState<ICategorySearch>({
        name: searchParams.get("name") || "",
        page: Number(searchParams.get("page")) || 1,
        size: Number(searchParams.get("size")) || 2
    });

    useEffect(() => {
        http_common.get<IGetCategories>("/api/categories/search",
            {
                params: {
                    ...search,
                    page: search.page - 1
                }
            })
            .then(response => setSearchResult(response.data));
    }, [search])

    const handleDelete = async (id: number) => {
        try {
            await http_common.delete(`/api/categories/${id}`);
            setSearchResult({ ...searchResult, content: content.filter(x => x.id != id) });
        }
        catch (error) {
            console.log("Error delete", error);
        }
    }

    const handlePageChange = async (page: number, newPageSize: number) => {
        findCategories({ ...search, page, size: newPageSize });
    };

    const findCategories = (model: ICategorySearch) => {
        setSearch(model);
        updateSearchParams(model);
    }

    const updateSearchParams = (params: ICategorySearch) => {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0 && value != "") {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    };

    return (
        <>
            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {content.length === 0 ? (
                            <h2>Categories list is empty</h2>
                        ) : (
                            content.map((item) =>
                                <CategoryCard key={item.id} item={item} handleDelete={handleDelete} />,
                            )
                        )}
                    </Row>
                </Col>
            </Row>

            <Row style={{ width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center' }}>
                <Pagination
                    showTotal={(total, range) => {
                        return (`${range[0]}-${range[1]} із ${total} записів`);
                    }}
                    current={search.page}
                    defaultPageSize={search.size}
                    total={totalElements}
                    onChange={handlePageChange}
                    pageSizeOptions={[1, 2, 5, 10]}
                    showSizeChanger
                />
            </Row>
        </>
    );
}

export default CategoryListPage;