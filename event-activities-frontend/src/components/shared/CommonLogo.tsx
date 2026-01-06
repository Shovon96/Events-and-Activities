import logo from '@/assets/images/eventora-new-logo76761.png'
import Image from 'next/image'
import Link from 'next/link'

export default function CommonLogo() {
    return (
        <Link href="/">
            <Image className="cursor-pointer h-10 w-auto" height={42} width={190} src={logo} alt="Eventora" />
        </Link>
    )
}