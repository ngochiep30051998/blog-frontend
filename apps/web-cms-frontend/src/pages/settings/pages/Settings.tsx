import { Tabs, Form, Input, Button, Switch, Select, Upload, message } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import PageHeader from '../../../components/PageHeader';
import Card from '../../../components/Card';

const { TextArea } = Input;

const Settings = () => {
  const [generalForm] = Form.useForm();
  const [seoForm] = Form.useForm();

  const handleGeneralSubmit = (values: any) => {
    console.log('General settings:', values);
    message.success('Đã lưu cài đặt chung');
  };

  const handleSeoSubmit = (values: any) => {
    console.log('SEO settings:', values);
    message.success('Đã lưu cài đặt SEO');
  };

  const tabItems = [
    {
      key: 'general',
      label: 'Cài đặt chung',
      children: (
        <Card>
          <Form
            form={generalForm}
            layout="vertical"
            onFinish={handleGeneralSubmit}
            initialValues={{
              siteName: 'Admin CMS',
              siteUrl: 'https://admin.example.com',
              adminEmail: 'admin@example.com',
              postsPerPage: 10,
              enableComments: true,
              enableRegistration: false,
            }}
          >
            <Form.Item
              label="Tên website"
              name="siteName"
              rules={[{ required: true, message: 'Vui lòng nhập tên website' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="URL website"
              name="siteUrl"
              rules={[
                { required: true, message: 'Vui lòng nhập URL' },
                { type: 'url', message: 'URL không hợp lệ' },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Email admin"
              name="adminEmail"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item label="Số bài viết mỗi trang" name="postsPerPage">
              <Select size="large">
                <Select.Option value={5}>5</Select.Option>
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={20}>20</Select.Option>
                <Select.Option value={50}>50</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Bình luận"
              name="enableComments"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Đăng ký người dùng"
              name="enableRegistration"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                size="large"
              >
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'seo',
      label: 'SEO',
      children: (
        <Card>
          <Form
            form={seoForm}
            layout="vertical"
            onFinish={handleSeoSubmit}
            initialValues={{
              metaTitle: 'Admin CMS - Quản lý nội dung',
              metaDescription: 'Hệ thống quản lý nội dung chuyên nghiệp',
              metaKeywords: 'cms, admin, blog, quản lý',
            }}
          >
            <Form.Item
              label="Meta Title"
              name="metaTitle"
              rules={[{ required: true }]}
            >
              <Input size="large" maxLength={60} showCount />
            </Form.Item>

            <Form.Item
              label="Meta Description"
              name="metaDescription"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} maxLength={160} showCount />
            </Form.Item>

            <Form.Item label="Meta Keywords" name="metaKeywords">
              <Input size="large" placeholder="keyword1, keyword2, keyword3" />
            </Form.Item>

            <Form.Item label="Open Graph Image" name="ogImage">
              <Upload>
                <Button icon={<UploadOutlined />}>Upload hình ảnh</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                size="large"
              >
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'appearance',
      label: 'Giao diện',
      children: (
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Logo</h3>
              <Upload>
                <Button icon={<UploadOutlined />}>Upload logo</Button>
              </Upload>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Favicon</h3>
              <Upload>
                <Button icon={<UploadOutlined />}>Upload favicon</Button>
              </Upload>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Màu chủ đạo</h3>
              <input
                type="color"
                className="w-20 h-10 rounded border border-gray-300"
                defaultValue="#1890ff"
              />
            </div>

            <Button
              type="primary"
              icon={<SaveOutlined />}
              size="large"
              onClick={() => message.success('Đã lưu cài đặt giao diện')}
            >
              Lưu thay đổi
            </Button>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Cài đặt"
        description="Quản lý cấu hình hệ thống"
      />

      <Tabs items={tabItems} />
    </div>
  );
};

export default Settings;
