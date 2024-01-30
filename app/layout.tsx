"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import { lighten } from 'polished';

const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] })

const primary = '#142c8e'

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
                colorPrimaryActive: primary,
                colorError: '#CD5C5C'
              },
              components: {
                Input: {
                  colorPrimary: primary,
                  colorPrimaryHover: primary,
                  colorPrimaryActive: 'red'
                },
                Button: {
                  colorPrimary: primary,
                  colorPrimaryHover: lighten(0.1, primary),
                },
                Pagination: {
                  colorPrimary: primary,
                  colorPrimaryHover: primary
                },
                Checkbox: {
                  colorPrimary: primary,
                  colorPrimaryHover: primary
                },
                Select: {
                  colorPrimary: primary,
                  colorPrimaryHover: primary,
                  optionSelectedBg: '#D3D3D3',
                  optionSelectedColor: 'black'
                },
                Switch: {
                  colorPrimary: '#142c8e'
                },
                Menu: {
                  itemSelectedBg: 'white',
                  itemActiveBg: 'white',
                  itemHoverColor: primary,
                  itemHoverBg: 'white',
                  itemColor: 'black',
                  itemSelectedColor: primary
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
