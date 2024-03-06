import { useToast } from "@/components/ui/use-toast";
import { loginSchema } from "@/schemas/login/login_schema";
import { useLoginUserMutation } from "@/store/login/loginApi";
import { shareWithCookies } from "@/utils/helpers/shareWithCookies";
import { shareWithLocal } from "@/utils/helpers/shareWithLocal";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LucideEye, LucideEyeOff } from "lucide-react";
import InputWrapper from "@/components/common/form/InputWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import FormWrapper from "@/components/common/form/FormWrapper";
import InternationalizeToggle from "@/components/InternationalizeToggle";
import { ModeToggle } from "@/components/ModeToggle";
import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";

interface ILoginFormData {
  email: string;
  password: string;
}

interface ILoginProps {}
const Login: FC<ILoginProps> = () => {
  const { companyName } = CLIENT_DETAILS;
  // TOAST HOOK
  const { toast } = useToast();

  // PASSWORD VISIBILITY STATE
  const [visible, setVisible] = useState(false);

  // NAVIGATION HOOK
  const navigate = useNavigate();

  // GET LOCATION HOOK
  const location = useLocation();

  // LOGIN USER MUTATION
  const [
    loginUser,
    { data: userData, isLoading: loginLoading, isSuccess, error },
  ] = useLoginUserMutation() as any;

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm<ILoginFormData>({ resolver: yupResolver(loginSchema) });
  // redirect user
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data: any) => {
    await loginUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      // COOKIE WILL BE EXPIRED WITHIN 7 DAYS AFTER LOGIN
      shareWithCookies(
        "set",
        `${CLIENT_DETAILS.companyCode}token`,
        7200,
        userData.accessToken
      );
      shareWithLocal("set", `${CLIENT_DETAILS.companyCode}user`, {
        name: userData?.data?.data?.name,
        avatar: userData?.data?.data?.avatar,
        email: userData?.data?.data?.email,
        role: userData?.data?.data?.role,
        id: userData?.data?.data?.id,
        address: userData?.data?.data?.address,
        phone: userData?.data?.data?.phone,
      });
      toast({
        title: "Login Message",
        description: "User login successfully",
      });
      navigate(from, { replace: true });
    }
  }, [isSuccess, toast, from, navigate, userData]);

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-center h-full">
      <aside className="hidden md:flex items-center justify-center w-full md:w-7/12 md:bg-tertiary h-screen">
        <div className="flex flex-col ">
          <h2 className="text-primary-foreground font-thin text-4xl text-white">
            Welcome to <br />
            <strong className="font-bold text-5xl ">{companyName}</strong>
          </h2>
          <a
            href="https://example.com"
            target="_blank"
            className="text-white mt-8"
          >
            www.techelementbd.com
          </a>
        </div>
      </aside>
      <aside className=" w-full md:w-5/12 flex flex-col  lg:h-screen">
        <div className="h-20 flex justify-end gap-x-4 pr-8 pt-4 mb-12">
          <InternationalizeToggle />
          <ModeToggle />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper heading="Login" size="half">
            {/* EMAIL INPUT */}
            <InputWrapper
              label="Write Your Email"
              labelFor="email"
              error={errors?.email?.message}
            >
              <Input
                type="email"
                id="email"
                placeholder="Write your email"
                {...register("email")}
              />
            </InputWrapper>
            {/* PASSWORD INPUT */}
            <InputWrapper
              label="Write Your Password"
              labelFor="password"
              error={errors?.password?.message}
            >
              <div className="relative">
                <Input
                  type={visible ? "text" : "password"}
                  id="password"
                  placeholder="Write your password"
                  {...register("password")}
                />

                <button
                  type="button"
                  className="text-lg absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer whitespace-nowrap rounded-md p-1 hover:bg-accent"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <LucideEye className="h-5 w-5" />
                  ) : (
                    <LucideEyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </InputWrapper>
            <div className="flex justify-end">
              <Button className="my-6" disabled={loginLoading} type="submit">
                {loginLoading && <ButtonLoader />}
                Login
              </Button>
            </div>

            {error && "data" in error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Error</AlertTitle>
                <AlertDescription>
                  {error?.data.message || "Something went wrong!, try again"}
                </AlertDescription>
              </Alert>
            )}
          </FormWrapper>
        </form>
      </aside>
    </section>
  );
};

export default Login;
