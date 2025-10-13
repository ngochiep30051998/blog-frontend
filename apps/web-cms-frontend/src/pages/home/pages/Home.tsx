import { Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
  LikeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import PageHeader from '../../../components/PageHeader';
import Card from '../../../components/Card';

const Home = () => {
  // Mock data - Trong thực tế sẽ fetch từ API
  const stats = [
    {
      title: 'Tổng bài viết',
      value: 1234,
      prefix: <FileTextOutlined />,
      suffix: 'bài',
      trend: 12.5,
      trendUp: true,
    },
    {
      title: 'Lượt xem',
      value: 45678,
      prefix: <EyeOutlined />,
      suffix: 'views',
      trend: 8.2,
      trendUp: true,
    },
    {
      title: 'Người dùng',
      value: 892,
      prefix: <UserOutlined />,
      suffix: 'users',
      trend: 3.1,
      trendUp: false,
    },
    {
      title: 'Lượt thích',
      value: 3456,
      prefix: <LikeOutlined />,
      suffix: 'likes',
      trend: 15.3,
      trendUp: true,
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'Hướng dẫn sử dụng React Hooks',
      author: 'Admin',
      views: 1234,
      date: '2025-10-13',
      status: 'published',
    },
    {
      id: 2,
      title: 'Tối ưu hiệu suất với Next.js',
      author: 'Editor',
      views: 987,
      date: '2025-10-12',
      status: 'published',
    },
    {
      id: 3,
      title: 'Tailwind CSS Tips & Tricks',
      author: 'Admin',
      views: 765,
      date: '2025-10-11',
      status: 'draft',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Tổng quan về hệ thống quản lý nội dung"
      />

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={
                  <span className="text-blue-600 text-2xl mr-2">
                    {stat.prefix}
                  </span>
                }
                suffix={
                  <span className="text-sm text-gray-500">{stat.suffix}</span>
                }
              />
              <div className="mt-2 flex items-center gap-1">
                <span
                  className={`flex items-center text-sm ${
                    stat.trendUp ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.trendUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  <span className="ml-1">{stat.trend}%</span>
                </span>
                <span className="text-xs text-gray-500">so với tháng trước</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Posts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Bài viết gần đây">
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <UserOutlined />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <EyeOutlined />
                        {post.views} views
                      </span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Hoạt động gần đây">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileTextOutlined className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Admin</span> đã tạo bài viết mới
                  </p>
                  <p className="text-xs text-gray-500">5 phút trước</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <UserOutlined className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Người dùng mới <span className="font-medium">john_doe</span>{' '}
                    đã đăng ký
                  </p>
                  <p className="text-xs text-gray-500">10 phút trước</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <LikeOutlined className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Bài viết nhận được 50 lượt thích mới
                  </p>
                  <p className="text-xs text-gray-500">1 giờ trước</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;