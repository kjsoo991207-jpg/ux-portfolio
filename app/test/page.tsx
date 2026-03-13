import dynamic from 'next/dynamic'

const DandelionTest = dynamic(() => import('@/components/DandelionTest'), {
  ssr: false,
})

export default function TestPage() {
  return <DandelionTest />
}
