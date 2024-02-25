import { useEffect, useState } from "react";
import { Form, Upload, Input, Button, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { useForm } from "antd/es/form/Form";
import http_common from "../../http_common.ts";
import { PlusOutlined } from '@ant-design/icons';
import { IUploadedFile } from "../create/types.ts";
import { ICategoryEdit } from "./types.ts";
import { APP_ENV } from "../../env/index.ts";
import TextArea from "antd/es/input/TextArea";

const CategoryEditPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [form] = useForm<ICategoryEdit>();
    const [file, setFile] = useState<UploadFile | null>();

    useEffect(() => {
        http_common.get(`/api/categories/${id}`)
            .then(response => {
                const { data } = response;
                form.setFieldsValue(data);
                setFile(
                    {
                        uid: '-1',
                        name: data.image,
                        status: 'done',
                        url: `${APP_ENV.BASE_URL}/uploading/150_${data.image}`,
                    });
            })
            .catch(error => {
                console.log("Error server ", error);
            });
    }, [id]);

    const onFinish = async (values: ICategoryEdit) => {
        try {
            await http_common.put("/api/categories", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (ex) {
            console.log("Exception create category", ex);
        }
    }

    return (
        <>
            <h1>Edit category</h1>
            <Row gutter={16}>
                <Form
                    form={form}
                    style={{
                        minWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 20,
                    }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout={"vertical"}
                    autoComplete="off" >
                    <Form.Item
                        name="id"
                        hidden
                    />
                    <Form.Item
                        label="Name"
                        name="name"
                        htmlFor="name"
                        rules={[{ required: true, message: 'Category name is required!' },
                        { min: 3, message: "Minimal length is 3" }]} >
                        <Input autoComplete="name" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        htmlFor="description"
                        rules={[{ required: true, message: 'Category description is required!' },
                        { min: 10, message: "Minimal length is 10" }]} >
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        name="file"
                        label="Image"
                        valuePropName="file"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                    >
                        <Upload
                            showUploadList={{ showPreviewIcon: false }}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                            fileList={file ? [file] : []}
                            onChange={(data) => {
                                setFile(data.fileList[0]);
                            }}

                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Обрати нове фото</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button style={{ margin: 10 }} type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button style={{ margin: 10 }} htmlType="button" onClick={() => {
                            navigate('/')
                        }}>
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </Row>
        </>
    );
}

export default CategoryEditPage;