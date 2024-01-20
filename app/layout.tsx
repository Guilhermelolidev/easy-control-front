"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimaryActive: '#65A300',
                colorError: '#CD5C5C'
              },
              components: {
                Input: {
                  colorPrimary: '#65A300',
                  colorPrimaryHover: '#65A300',
                  colorPrimaryActive: 'red'
                },
                Button: {
                  colorPrimary: '#65A300',
                  colorPrimaryHover: '#659800',
                  colorPrimaryBg: '#65A300',
                },
                Pagination: {
                  colorPrimary: '#65A300',
                  colorPrimaryHover: '#65A300'
                },
                Checkbox: {
                  colorPrimary: '#65A300',
                  colorPrimaryHover: '#65A300'
                },
                Select: {
                  colorPrimary: '#65A300',
                  colorPrimaryHover: '#65A300',
                  optionSelectedBg: '#D3D3D3',
                  optionSelectedColor: 'black'
                },
                Switch: {
                  colorPrimary: '#142c8e'
                },
                Menu: {
                  itemSelectedBg: 'white',
                  itemActiveBg: 'white',
                  itemHoverColor: '#65A300',
                  itemHoverBg: 'white',
                  itemColor: 'black',
                  itemSelectedColor: '#65A300'
                }
              }
            }
            }
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html >
  )
}
