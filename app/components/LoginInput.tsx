//"use client";

interface Props {
    inputs: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        city: string,
        password: string
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSignin: boolean
}

const LoginInput = ({ inputs, handleChange, isSignin }: Props) => {
    return (
        <>
            {
                isSignin ? null :
                    <div className="my-3 flex justify-between text-sm">
                        <input type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="First Name"
                            value={inputs.firstName}
                            name="firstName"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="Last Name"
                            value={inputs.lastName}
                            name="lastName"
                            onChange={handleChange}
                        />
                    </div>
            }

            <div className="my-3 flex justify-between text-sm">
                <input
                    type="email"
                    className="border rounded p-2 py-3 w-full"
                    placeholder="Email"
                    value={inputs.email}
                    name="email"
                    onChange={handleChange}
                />
            </div>
            {
                isSignin ? null :
                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="text"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="City"
                            value={inputs.city}
                            name="city"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            className="border rounded p-2 py-3 w-[49%]"
                            placeholder="Phone"
                            value={inputs.phone}
                            name="phone"
                            onChange={handleChange}
                        />
                    </div>
            }

            <div className="my-3 flex justify-between text-sm">
                <input
                    type="password"
                    className="border rounded p-2 py-3 w-full"
                    placeholder="Password"
                    value={inputs.password}
                    name="password"
                    onChange={handleChange}
                />
            </div>
        </>
    )
}

export default LoginInput;