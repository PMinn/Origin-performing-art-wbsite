import Head from 'next/head';
import Link from 'next/link';
import Color from "@/utils/Color";
import tailwindConfig from '@/tailwind.config.js';
const { colors } = tailwindConfig.theme;

const PrimaryPalette = [
    {
        name: '起源橘',
        hex: colors.primary
    }
];

const SecondaryPalette = [
    {
        name: '高光金',
        hex: colors.secondary.DEFAULT
    },
    {
        name: '猩紅',
        hex: colors.tertiary.DEFAULT
    },
    {
        name: '藤黃',
        hex: colors.quaternary.DEFAULT
    },
    {
        name: '雅法橙',
        hex: colors.quinary.DEFAULT
    }
];

const grayKeys = Object.keys(colors.gray);
const grayGradient = [
    { name: '白', hex: '#FFFFFF' }, ...grayKeys.map(key => ({ name: '灰 ' + key, hex: colors.gray[key].toUpperCase() })), { name: '黑', hex: '#000000' }
]

function Section({ title, children, ...props }) {
    return (
        <div className="mb-[20vh]" {...props}>
            {title && <h2 className="mb-4 text-2xl font-bold pb-4 border-b-2 border-secondary mb-8">{title}</h2>}
            {children}
        </div>
    )
}

function Subsection({ title, children, ...props }) {
    return (
        <div className="mb-10" {...props}>
            {title && <h3 className="mb-5 text-xl font-semibold border-l-2 border-tertiary pl-4">{title}</h3>}
            {children}
        </div>
    )
}

function PrintColorBlock({ color, className = "", style = {}, ...props }) {
    const { name, hex } = color;
    const colorObject = new Color(hex);
    const rgb = colorObject.toRGB();
    const cmyk = colorObject.toCMYK().map(value => Math.round(value * 100));
    className += ' p-4 md:pt-[200px]';
    const luminance = colorObject.relativeLuminance();
    style.backgroundColor = hex;
    style.color = luminance < 0.179 ? '#ffffff' : '#000000';
    return (
        <div className={className} style={style} {...props}>
            <div>{name}</div>
            <div>{hex.toUpperCase()}</div>
            <div>RGB {rgb.join(' / ')}</div>
            <div>CMYK {cmyk.join(' / ')}</div>
            <small className="flex"><span className="block w-5">B</span><span className="block grow text-right">{colorObject.getContrastByRelativeLuminance(luminance, 0).toFixed(2)}</span></small>
            <small className="flex"><span className="block w-5">W</span><span className="block grow text-right">{colorObject.getContrastByRelativeLuminance(luminance, 1).toFixed(2)}</span></small>
        </div>
    )
}

export default function BI({ title, description }) {
    return (
        <>
            <Head>
                {/* HTML Meta Tags  */}
                <title>{title}</title>
                <meta name='keywords' content='Origin,起源劇團,火舞,藝術,表演' />
                <meta name='description' content={description} />

                {/* Facebook Meta Tags */}
                <meta property="og:url" content="https://origin-performing-art.web.app/" />
                <meta property="og:type" content="website" /> {/* article */}
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property="og:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="app" /> {/* summary, summary_large_image, app, player */}
                <meta property="twitter:domain" content="origin-performing-art.web.app" />
                <meta property="twitter:url" content="https://origin-performing-art.web.app/" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
            </Head>
            <div className="container flex pt-[7vh] mx-auto w-[90%] gap-10">
                <div className="w-[350px] md:block mx-auto h-[93vh] hidden text-primary sticky top-[7vh] border-b-[5px] border-primary">
                    <div className='w-full bg-primary pt-5 pb-3 text-black px-4 text-end mb-5 font-semibold text-2xl tracking-wide'>品牌識別系統</div>
                    <a href="#vision" className="py-3 block pointer px-4 text-end underline underline-offset-4">願景</a>
                    <a href="#logo_format" className="py-3 block pointer px-4 text-end underline underline-offset-4">標誌規範</a>
                    <a href="#font" className="py-3 block pointer px-4 text-end underline underline-offset-4">字體</a>
                    <a href="#colors" className="py-3 block pointer px-4 text-end underline underline-offset-4">色彩</a>
                    <a href="#specification_writing" className="py-3 block pointer px-4 text-end underline underline-offset-4">名稱書寫規範</a>
                    <a href="#typography" className="py-3 block pointer px-4 text-end underline underline-offset-4">文字版型</a>
                    <a href="#graphic" className="py-3 block pointer px-4 text-end underline underline-offset-4">圖形</a>
                </div>
                <div className="w-full pt-6">
                    <Section title='1. 願景 VISION' id='vision'>
                        <Subsection title='起源劇團品牌願景'>
                            <div>
                                起源劇團秉持著將對表演的酷愛與熱忱，藉著令人醉心的歌曲、震撼人心的表演帶給觀眾留下一抹永恆的回憶。
                            </div>
                        </Subsection>
                    </Section>
                    <Section title='2. 標誌規範 LOGO FORMAT' id='logo_format'>
                        <Subsection>
                            <div>標誌展現品牌核心價值。</div>
                            <div className='w-1/2 max-w-[250px] pt-10'>
                                <div className='mb-2'>標誌 A - 全彩</div>
                                <img className='w-full' src="/media/logo-standard.png" alt="" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-10 py-20 px-5">
                                <div className='w-full md:w-1/2'>
                                    <div className='mb-2'>標誌 B - 全彩</div>
                                    <img className='w-full' src="/media/logo-standard-text.png" alt="" />
                                </div>
                                <div className='w-full md:w-1/2'>
                                    <div className='mb-2'>標誌 C - 全彩</div>
                                    <img className='w-full' src="/media/logo-standard-text2.png" alt="" />
                                </div>
                            </div>
                        </Subsection>
                        <Subsection title='標誌比例規範'>
                            <div className="mb-4">標誌使用放大縮小請用以下尺寸比例規範。</div>
                            <div className="mb-4">標誌 B</div>
                            <img src="/media/BIS/logo-standard-text.png" alt="" />
                            <div className="mb-4">標誌 C</div>
                            <img src="/media/BIS/logo-standard-text2.png" alt="" />
                        </Subsection>
                        <Subsection title='標誌周圍空間留白'>
                            <div className="mb-4">標誌為顯現其視覺比例效果，使用時，四周空間規範如下，請確保空間內無任何其他元素。</div>
                            <div className="mb-4">標誌 B</div>
                            <img src="/media/BIS/logo-standard-text_space.png" alt="" />
                            <div className="mb-4">標誌 C</div>
                            <img src="/media/BIS/logo-standard-text2_space.png" alt="" />
                        </Subsection>
                        <Subsection title='標誌於標準色 - 起源橘背景呈現'>
                            <div className="mb-4">起源橘為背景時，使用黑標誌呈現。</div>
                            <div className="flex flex-col md:flex-row gap-10 py-20 px-5 bg-primary text-black">
                                <div className='w-full md:w-1/2'>
                                    <div className='mb-2'>標誌 B - 黑</div>
                                    <img className='w-full' src="/media/logo-standard-black-text.png" alt="" />
                                </div>
                                <div className='w-full md:w-1/2'>
                                    <div className='mb-2'>標誌 C - 黑</div>
                                    <img className='w-full' src="/media/logo-standard-black-text2.png" alt="" />
                                </div>
                            </div>
                        </Subsection>
                        <Subsection title='標誌特殊用法'>
                            <div className="mb-4">以下特殊用法，僅限紙本黑白印刷使用，包含各類文件。</div>
                            <div className="flex flex-col md:flex-row gap-10 py-20 px-5 bg-white text-black">
                                <div className='w-full md:w-1/2'>
                                    <div className='mb-2'>標誌 B - 黑</div>
                                    <img className='w-full' src="/media/logo-standard-black-text.png" alt="" />
                                </div>
                                <div className='w-full md:w-1/2'>
                                    <div className='mb-2'>標誌 C - 黑</div>
                                    <img className='w-full' src="/media/logo-standard-black-text2.png" alt="" />
                                </div>
                            </div>
                        </Subsection>
                    </Section>
                    <Section title='3. 字體 FONT' id='font'>
                        <Subsection title='思源黑體'>
                            <div>
                                起源劇團標準用字，凡起源劇團相關文件、海報、宣傳品等，若有需求，應優先使用思源黑體。
                                <br />
                                字型詳情可參考 <Link className="anchor--primary pointer" href="https://fonts.google.com/noto/specimen/Noto+Sans+TC" target="_blank">Noto Sans Traditional Chinese - Google Fonts</Link>。
                            </div>
                            <div className="text-quinary mb-2 mt-10">思源黑體 Light</div>
                            <div className='font-light'>
                                <div className="text-3xl mb-2">我們因著火舞而相遇</div>
                                <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                                <div>abcdefghijklmnopqrstuvwxyz</div>
                            </div>
                            <div className="text-quinary mb-2 mt-10">思源黑體 Regular</div>
                            <div className=''>
                                <div className="text-3xl mb-2">我們因著火舞而相遇</div>
                                <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                                <div>abcdefghijklmnopqrstuvwxyz</div>
                            </div>
                            <div className="text-quinary mb-2 mt-10">思源黑體 Bold</div>
                            <div className='font-bold'>
                                <div className="text-3xl mb-2">我們因著火舞而相遇</div>
                                <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                                <div>abcdefghijklmnopqrstuvwxyz</div>
                            </div>
                        </Subsection>
                    </Section>
                    <Section title='4. 色彩 COLORS' id='colors'>
                        <Subsection>為維護品牌視覺統一，僅能使用以下規範之色彩。</Subsection>
                        <Subsection title='主色'>
                            <div className="grid grid-cols-1 md:grid-cols-5">
                                {
                                    PrimaryPalette.map((color, index) => <PrintColorBlock color={color} key={'pc_' + index} />)
                                }
                            </div>
                        </Subsection>
                        <Subsection title='輔助色'>
                            <div className="grid grid-cols-1 md:grid-cols-5">
                                {
                                    SecondaryPalette.map((color, index) => <PrintColorBlock color={color} key={'sc_' + index} />)
                                }
                            </div>
                        </Subsection>
                        <Subsection title='灰階'>
                            <div className='my-2'>背景顏色統一使用灰 950</div>
                            <div className='grid grid-cols-1 md:grid-cols-5'>
                                {
                                    grayGradient.map((color, i) => (
                                        <PrintColorBlock color={color} hex={color.hex} key={'i_' + i} />
                                    ))
                                }
                            </div>
                        </Subsection>
                    </Section>
                    <Section title='5. 名稱書寫規範 SPECIFICATION WRITING' id="specification_writing">
                        <Subsection>
                            <div>
                                在書寫版面中，當提及 Origin 時，開頭請使用大寫，後面為小寫，並與前後字空格，且不要嵌入品牌標誌。
                                <br />
                                如遇特殊情況或排版需求，如全形英文標語，可用全大寫字母。
                            </div>
                        </Subsection>
                        <Subsection title='正確'>
                            <div className='mt-10'>
                                <div className="border border-gray-700 text-2xl px-10 py-5 text-center">跟著 Origin 一起遇火重生</div>
                                <div className='text-center mt-2 text-gray-400'>一般書寫，大 'O' 加小 'rigin'</div>
                            </div>
                            <div className='mt-10'>
                                <div className="border border-gray-700 text-2xl px-10 py-5 text-center">ABOUT ORIGIN !</div>
                                <div className='text-center mt-2 text-gray-400'>特殊情況或排版需求，可用全大寫字母</div>
                            </div>
                        </Subsection>
                        <Subsection title='錯誤'>
                            <div className="flex flex-col md:flex-row mt-5 gap-10">
                                <div className='w-full'>
                                    <div className="border border-gray-700 text-2xl px-10 py-5 text-center">跟著 Origing 一起遇火重生</div>
                                    <div className='text-center mt-2 text-gray-400'>注意有無拼錯字母</div>
                                </div>
                                <div className='w-full'>
                                    <div className="border border-gray-700 text-2xl px-10 py-5 text-center">跟著 O-rigin 一起遇火重生</div>
                                    <div className='text-center mt-2 text-gray-400'>請勿增加符號在品牌名稱中</div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-5 gap-10">
                                <div className='w-full'>
                                    <div className="border border-gray-700 text-2xl px-10 py-5 text-center">跟著Origin一起遇火重生</div>
                                    <div className='text-center mt-2 text-gray-400'>前後請留空格</div>
                                </div>
                                <div className='w-full'>
                                    <div className="border border-gray-700 text-2xl px-10 py-5 text-center">跟著 origin 一起遇火重生</div>
                                    <div className='text-center mt-2 text-gray-400'>開頭請保持大寫</div>
                                </div>
                            </div>
                        </Subsection>
                    </Section>
                    <Section title='6. 文字版型 TYPOGRAPHY' id="typography">
                        <Subsection title='樣式'>
                            <table className='w-full text-center'>
                                <thead className='bg-tertiary'>
                                    <tr>
                                        <th className='py-4'>類型</th>
                                        <th className='py-4'>重量</th>
                                        <th className='py-4'>大小</th>
                                        <th className='py-4'>最小行高</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='py-2'>Heading 1</td>
                                        <td className='py-2'>Heavy</td>
                                        <td className='py-2'>24</td>
                                        <td className='py-2'>1.7</td>
                                    </tr>
                                    <tr>
                                        <td className='py-2'>Heading 2</td>
                                        <td className='py-2'>Bold</td>
                                        <td className='py-2'>17</td>
                                        <td className='py-2'>1.7</td>
                                    </tr>
                                    <tr>
                                        <td className='py-2'>Heading 3</td>
                                        <td className='py-2'>Bold</td>
                                        <td className='py-2'>14</td>
                                        <td className='py-2'>1.7</td>
                                    </tr>
                                    <tr>
                                        <td className='py-2'>Title 1</td>
                                        <td className='py-2'>Bold</td>
                                        <td className='py-2'>23</td>
                                        <td className='py-2'>1.7</td>
                                    </tr>
                                    <tr>
                                        <td className='py-2'>Title 2</td>
                                        <td className='py-2'>SemiBold, Bold</td>
                                        <td className='py-2'>19</td>
                                        <td className='py-2'>1.7</td>
                                    </tr>
                                    <tr>
                                        <td className='py-2'>Title 3</td>
                                        <td className='py-2'>Medium, Semibold</td>
                                        <td className='py-2'>16</td>
                                        <td className='py-2'>1.7</td>
                                    </tr>
                                    <tr>
                                        <td className='py-2'>Body</td>
                                        <td className='py-2'>Regular</td>
                                        <td className='py-2'>16</td>
                                        <td className='py-2'>1.7</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Subsection>
                        <Subsection title='預留超連結文字樣式'>
                            <div>起源橘字加底線為預留超連結文字樣式，請勿使用。</div>
                            <div className='text-primary underline mt-5'>我是超連結</div>
                        </Subsection>
                    </Section>
                    <Section title='7. 圖形 GRAPHICS' id="graphic">
                        <Subsection title='矩形'>
                            <div>使用矩形請勿使用圓角。</div>
                            <div className="flex flex-col md:flex-row gap-5 mt-5 md:p-5 w-full md:aspect-[2/1]">
                                <div className="border border-tertiary w-full h-full flex justify-center items-center">
                                    <div className='text-center leading-loose tracking-wide'>
                                        我們因著火舞而相遇
                                        <br />
                                        有了共同努力的目標
                                        <br />
                                        我們想將對表演的酷愛與熱忱
                                        <br />
                                        與其令人無法抵擋的歡樂帶上街頭
                                        <br />
                                        在觀眾的心中留下一抹深刻的記憶
                                    </div>
                                </div>
                                <div className='bg-secondary w-full h-full flex justify-center items-center'>
                                    <svg className='w-1/2 h-1/2' xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="#000000" viewBox="0 0 256 256"><path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z"></path></svg>
                                </div>
                                <div className='bg-primary w-full h-full flex justify-start items-end'>
                                    <div className='p-5 leading-loose text-black tracking-wide'>
                                        起源劇團秉持著將對表演的酷愛與熱忱
                                        <br />
                                        藉著令人醉心的歌曲
                                        <br />
                                        震撼人心的表演帶給觀眾
                                        <br />
                                        留下一抹永恆的回憶。
                                    </div>
                                </div>
                            </div>
                        </Subsection>
                        <Subsection title='預留按鈕圖形'>
                            <div>起源橘背景單行文字矩形為預留按鈕圖形，請勿使用。</div>
                            <div className='px-10 py-3 bg-primary text-black inline-block mt-5'>我是按鈕</div>
                        </Subsection>
                    </Section>
                </div>
            </div>
        </>
    )
}

export function getStaticProps() {
    return {
        props: {
            title: '品牌識別系統 | Origin 起源劇團',
            description: '品牌識別系統'
        }
    }
}