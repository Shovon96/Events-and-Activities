import logo from '@/assets/images/eventora-logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function CommonLogo() {
    return (
        <Link href="/">
            <Image height={110} width={240} src={logo} alt="Eventora" />
        </Link>
    )
}