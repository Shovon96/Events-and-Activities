
import UserRegisterForm from "@/components/modules/auth/RegisterForm";
import favicon from "@/app/favicon.ico"
import Image from "next/image";

const RegisterPage = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Left Section - Purple Branding */}
                <div className="hidden lg:flex w-2/5 bg-linear-to-b from-primary via-primary/90 to-secondary flex-col justify-between p-12 text-white">
                    <div>
                        {/* logo */}
                        <div className="flex items-center gap-2 py-3">
                            <Image height={50} width={50} src={favicon} alt="Eventora" />
                            <h1 className="text-4xl font-bold italic leading-tight">Eventora</h1>
                        </div>
                        <h1 className="text-4xl font-bold mb-4 leading-tight">Discover events that match your passion</h1>
                        <p className="text-purple-100 mb-8">Join thousands of event enthusiasts. Find, attend, and create memorable experiences in your community.</p>
                    </div>

                    <div>
                        <div className="flex gap-1 mb-8 items-center">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 bg-white bg-opacity-30 rounded-full" />
                            ))}
                            <p className="text-sm text-purple-100 ml-3">10,000+ event lovers joined this month</p>
                        </div>
                        <div className="flex items-center gap-8 text-center">
                            <div>
                                <p className="text-3xl font-bold">50K+</p>
                                <p className="text-sm text-purple-100">Events</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">200+</p>
                                <p className="text-sm text-purple-100">Cities</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">1M+</p>
                                <p className="text-sm text-purple-100">Members</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Form */}
                <UserRegisterForm />
            </div>
        </>
    );
};

export default RegisterPage;
