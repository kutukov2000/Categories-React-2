import { useEffect } from "react";
import { message, Form, Upload, Input, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import type { UploadChangeParam } from 'antd/es/upload/interface';
import { useForm } from "antd/es/form/Form";
import http_common from "../../http_common.ts";
import { PlusOutlined } from '@ant-design/icons';
import { IUploadedFile } from "../create/types.ts";

const CategoryEditPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [form] = useForm();

    useEffect(() => {
        http_common.get(`/api/categories/${id}`)
            .then(response => {
                form.setFieldsValue({
                    name: response.data?.name,
                    description: response.data?.description
                });
            });
    }, [id]);

    const onFinish = async (values: any) => {
        try {
            await http_common.put(`/api/categories/${id}`, values, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            navigate("/");
        } catch (ex) {
            console.log('Category editing error!', values);
            message.error('Category editing error!');
            navigate("/");
        }
    };

    return (
        <>
            <h1>Edit category</h1>
            <Form
                form={form}
                style={{ maxWidth: 1000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off" >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Category name is required!' }]} >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Category description is required!' }]} >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image"
                    valuePropName="image"
                    getValueFromEvent={(e: UploadChangeParam) => {
                        const image = e?.fileList[0] as IUploadedFile;
                        return image?.originFileObj;
                    }}

                    rules={[{ required: true, message: 'Image is required!' }]}>
                    <Upload
                        showUploadList={true}
                        beforeUpload={() => false}
                        accept="image/*"
                        listType="picture-card"
                        maxCount={1}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload new image</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CategoryEditPage;