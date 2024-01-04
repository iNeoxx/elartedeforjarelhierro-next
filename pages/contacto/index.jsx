import Link from "next/link";
import { Layout } from "../../components/layout";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { Button, Checkbox } from "@nextui-org/react";
import  styles  from "./contacto.module.css"
import ReCAPTCHA from "react-google-recaptcha";
import Head from "next/head"

export default function Contacto() {
  const form = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const [hover, setHover] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    form_user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if(!recaptchaToken) {
      toast("Por favor, completa el reCAPTCHA!", {
        style: {
          border: "2px solid #f39200",
          borderRadius: "1rem",
          backgroundColor: "white",
          color: "#f39200",
          fontWeight: "bold",
          padding: "15px",
          fontSize: "1.1rem",
        }
      });
      return;
    }

    if (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID &&
      form.current &&
      isSelected
    ) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
        .then(
          toast.success("Se envió el formulario con exito!", {
            style: {
              border: "2px solid #43ce14",
              borderRadius: "1rem",
              backgroundColor: "white",
              color: "#43ce14",
              fontWeight: "bold",
              padding: "15px",
              fontSize: "1.1rem",
              textAlign: "center",
            },
            duration: 3200,
          }),
          setFormData({
            form_user_name: "",
            user_email: "",
            message: "",
          }),
          setIsSelected(false),
        );
    } else {
      toast.error("No se pudo enviar el formulario!", {
        style: {
          border: "2px solid #Dc0b0b",
          borderRadius: "1rem",
          backgroundColor: "white",
          color: "#ff0000",
          fontWeight: "bold",
          padding: "15px",
          fontSize: "1.1rem",
        },
        duration: 3200,
      });
    }
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setRecaptchaToken(null);
    }
  };

  return (
    <Layout className="my-0">
      <Head>
        <title>Contacto | El Arte de Forjar el Hierro</title>
        <meta
          name="description"
          content="Ponte en contacto con nosotros para realizar tus trabajos."
        />
      </Head>
      <div className="pt-10">
        <div>
          <h1 className="md:text-5xl text-2xl font-bold text-center mx-auto text-contactSectionColor">
            Contáctenos
          </h1>
          <p className="text-center md:text-base text-sm md:max-w-none w-full max-w-[300px] justify-center mx-auto font-normal text-colorSubtitleContact mt-4">
            ¿Tienes alguna pregunta? Envíanos un mensaje en tu medio de
            comunicación de preferencia
          </p>
        </div>
        <div className="2xl:grid 2xl:grid-cols-[590px,900px] max-w-[800px] mx-auto justify-center mt-14 ">
          <div className="bg-contactSectionColor 2xl:rounded-l-[50px] 2xl:rounded-none rounded-3xl lg:mx-0 mx-5 shadow-[2px_0px_38px_0px_rgba(120,116,116,0.65)]">
            <div className="">
                <div className={styles.backgroundWhite}/>
            </div>
            <div className="text-center 2xl:pt-28 mx-auto pt-10 sm:max-w-none max-w-[200px]">
              <h2 className="text-white font-semibold md:text-[28px] text-2xl text-center">
                Ponte en contacto con nosotros
              </h2>
              <p className="text-[#C9C9C9] md:text-lg text-sm font-normal text-center sm:mt-5">
                En distintos medios sociales
              </p>
            </div>
            <div className="mt-16 ml-10">
              <div className="flex">
                <div className="my-auto">
                  <svg
                    width="29"
                    height="33"
                    viewBox="0 0 29 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.4613 23.0773L21.3532 20.0452C21.0923 19.9164 20.8023 19.8893 20.5269 19.9679C20.2515 20.0465 20.0056 20.2266 19.8262 20.4811L17.1211 24.3091C12.8758 21.9907 9.45935 18.0334 7.45773 13.1162L10.7627 9.98304C10.9828 9.77564 11.1386 9.49081 11.2065 9.17166C11.2744 8.85252 11.2507 8.51644 11.139 8.21431L8.5212 1.1394C8.39856 0.813703 8.18164 0.547785 7.90785 0.387496C7.63407 0.227207 7.32058 0.182594 7.02144 0.261349L1.34959 1.7774C1.06118 1.85454 0.803866 2.04263 0.619634 2.31098C0.435403 2.57932 0.335139 2.91207 0.335205 3.25492C0.335205 19.4577 11.6734 32.5653 25.6404 32.5653C25.9364 32.5655 26.2239 32.4494 26.4556 32.236C26.6874 32.0226 26.8499 31.7245 26.9165 31.3903L28.2254 24.8208C28.293 24.4726 28.2536 24.108 28.1142 23.7898C27.9747 23.4716 27.7439 23.2197 27.4613 23.0773Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="my-auto ml-10 text-white text-sm font-normal">
                  <p>+(506) 88888888</p>
                  <p>+(506) 88888888</p>
                </div>
              </div>
              <div className="2xl:my-11 my-8 flex">
                <div className="my-auto">
                  <svg
                    width="29"
                    height="25"
                    viewBox="0 0 29 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.7286 8.83681C27.9413 8.64341 28.2576 8.82433 28.2576 9.13003V21.8884C28.2576 23.5416 27.0851 24.883 25.6399 24.883H2.95293C1.50773 24.883 0.335205 23.5416 0.335205 21.8884V9.13627C0.335205 8.82433 0.64606 8.64965 0.864204 8.84305C2.08581 9.9286 3.70553 11.3074 9.2682 15.9303C10.4189 16.8911 12.3604 18.9125 14.2964 18.9C16.2434 18.9187 18.223 16.8537 19.3301 15.9303C24.8928 11.3074 26.507 9.92236 27.7286 8.83681ZM14.2964 16.8973C15.5617 16.9223 17.3832 15.0756 18.2994 14.3145C25.5363 8.30651 26.0871 7.78245 27.7559 6.28514C28.0722 6.0044 28.2576 5.56768 28.2576 5.10601V3.92064C28.2576 2.26736 27.0851 0.926025 25.6399 0.926025H2.95293C1.50773 0.926025 0.335205 2.26736 0.335205 3.92064V5.10601C0.335205 5.56768 0.520627 5.99816 0.836936 6.28514C2.50574 7.77622 3.05655 8.30651 10.2935 14.3145C11.2097 15.0756 13.0312 16.9223 14.2964 16.8973Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p className="ml-10 my-auto text-white text-sm font-normal">
                  elartedeforjar@gmail.com
                </p>
              </div>
              <div className="flex">
                <div className="my-auto">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_176_571)">
                      <path
                        d="M15.876 2.00006C13.6887 2.00264 11.5918 2.87266 10.0452 4.41928C8.49859 5.9659 7.62857 8.06282 7.62599 10.2501C7.62337 12.0375 8.20722 13.7764 9.28799 15.2001C9.28799 15.2001 9.51299 15.4963 9.54974 15.5391L15.876 23.0001L22.2052 15.5353C22.2382 15.4956 22.464 15.2001 22.464 15.2001L22.4647 15.1978C23.545 13.7748 24.1285 12.0367 24.126 10.2501C24.1234 8.06282 23.2534 5.9659 21.7068 4.41928C20.1601 2.87266 18.0632 2.00264 15.876 2.00006ZM15.876 13.2501C15.2826 13.2501 14.7026 13.0741 14.2093 12.7445C13.7159 12.4148 13.3314 11.9463 13.1043 11.3981C12.8773 10.8499 12.8179 10.2467 12.9336 9.66479C13.0494 9.08285 13.3351 8.5483 13.7547 8.12874C14.1742 7.70918 14.7088 7.42346 15.2907 7.3077C15.8727 7.19195 16.4759 7.25136 17.024 7.47842C17.5722 7.70548 18.0407 8.09 18.3704 8.58335C18.7 9.0767 18.876 9.65672 18.876 10.2501C18.875 11.0454 18.5586 11.8079 17.9962 12.3703C17.4338 12.9327 16.6713 13.2491 15.876 13.2501Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_176_571">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.666016 0.374878)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="ml-10 text-white font-normal text-sm my-auto">
                  <p>Sardinal de Carrillo</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className={styles.backgroundWhite2}/>
            </div>
            <div className="flex gap-9 2xl:ml-10 2xl:mt-[200px] mt-28 2xl:pb-12 pb-10 2xl:justify-normal justify-center">
              <Link href="/">
                <svg
                  width="29"
                  height="31"
                  viewBox="0 0 29 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_176_584)">
                    <path
                      d="M28.752 15.5102C28.752 7.28949 22.4839 0.625183 14.752 0.625183C7.02003 0.625183 0.751953 7.28949 0.751953 15.5102C0.751953 22.4907 5.27227 28.3482 11.3701 29.957V20.059H8.48331V15.5102H11.3701V13.5501C11.3701 8.48387 13.5267 6.13561 18.2049 6.13561C19.092 6.13561 20.6224 6.32078 21.2485 6.50535V10.6285C20.9181 10.5916 20.3441 10.5731 19.6312 10.5731C17.3358 10.5731 16.4488 11.4978 16.4488 13.9014V15.5102H21.0217L20.236 20.059H16.4488V30.2862C23.381 29.3961 28.7525 23.1206 28.7525 15.5102H28.752Z"
                      fill="white"
                    />
                    <path
                      d="M20.2351 20.059L21.0208 15.5102H16.4479V13.9014C16.4479 11.4978 17.3349 10.5731 19.6303 10.5731C20.3432 10.5731 20.9172 10.5916 21.2476 10.6285V6.50535C20.6215 6.32018 19.0911 6.1356 18.204 6.1356C13.5258 6.1356 11.3692 8.48386 11.3692 13.5501V15.5102H8.48242V20.059H11.3692V29.957C12.4523 30.2428 13.5851 30.3952 14.7511 30.3952C15.3251 30.3952 15.8912 30.3577 16.4473 30.2862V20.059H20.2346H20.2351Z"
                      fill="#497EDA"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_176_584">
                      <rect
                        width="28"
                        height="29.77"
                        fill="white"
                        transform="translate(0.751953 0.625183)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
              <Link href="/">
                <svg
                  width="29"
                  height="30"
                  viewBox="0 0 29 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_176_585)">
                    <path
                      d="M1.44246 29.77C1.28523 29.77 1.13228 29.7039 1.01885 29.5819C0.86931 29.4211 0.811632 29.1876 0.867814 28.9694L2.68809 21.9021C1.55483 19.7233 0.957322 17.2585 0.958177 14.7564C0.961381 6.61962 7.18934 0 14.8417 0C18.5534 0.00158989 22.041 1.53879 24.6624 4.32791C27.2833 7.11725 28.7261 10.8251 28.7251 14.7683C28.7217 22.9053 22.4937 29.5254 14.8417 29.5254C14.8417 29.5254 14.836 29.5254 14.8357 29.5254C12.6006 29.5245 10.3847 28.9453 8.41169 27.8483L1.59349 29.7493C1.5435 29.7632 1.49266 29.77 1.44246 29.77Z"
                      fill="#E5E5E5"
                    />
                    <path
                      d="M1.44238 29.1365L3.3274 21.8178C2.16464 19.6758 1.55304 17.246 1.55389 14.7566C1.55688 6.96916 7.5174 0.633469 14.8417 0.633469C18.396 0.635059 21.7321 2.10593 24.2409 4.77557C26.7495 7.44522 28.1306 10.9938 28.1293 14.768C28.1261 22.5553 22.1647 28.8919 14.8417 28.8919C14.8413 28.8919 14.8419 28.8919 14.8417 28.8919H14.8359C12.6121 28.891 10.4272 28.2979 8.4864 27.1725L1.44238 29.1365ZM8.8126 24.6158L9.21614 24.8699C10.9115 25.9397 12.8552 26.5054 14.8374 26.5066H14.8417C20.9287 26.5066 25.883 21.24 25.8856 14.7671C25.8867 11.6303 24.7391 8.68056 22.6539 6.46176C20.5685 4.24296 17.7959 3.02034 14.8458 3.01898C8.75386 3.01898 3.79972 8.28491 3.79737 14.7576C3.79651 16.9757 4.38013 19.1356 5.48585 21.0049L5.7486 21.4492L4.63263 25.7809L8.8126 24.6158Z"
                      fill="white"
                    />
                    <path
                      d="M1.9043 28.6434L3.72415 21.5777C2.60135 19.51 2.01111 17.164 2.01175 14.7612C2.01453 7.2433 7.76888 1.127 14.8392 1.127C18.2708 1.12859 21.4916 2.54859 23.913 5.1258C26.3351 7.70301 27.6681 11.1288 27.6668 14.7719C27.6638 22.29 21.9092 28.407 14.8398 28.407C14.8392 28.407 14.84 28.407 14.8398 28.407H14.834C12.6873 28.4061 10.5778 27.8333 8.70434 26.7476L1.9043 28.6434Z"
                      fill="#497EDA"
                    />
                    <path
                      d="M1.44238 29.1365L3.3274 21.8178C2.16464 19.6758 1.55304 17.246 1.55389 14.7566C1.55688 6.96916 7.5174 0.633469 14.8417 0.633469C18.396 0.635059 21.7321 2.10593 24.2409 4.77557C26.7495 7.44522 28.1306 10.9938 28.1293 14.768C28.1261 22.5553 22.1647 28.8919 14.8417 28.8919C14.8413 28.8919 14.8419 28.8919 14.8417 28.8919H14.8359C12.6121 28.891 10.4272 28.2979 8.4864 27.1725L1.44238 29.1365ZM8.8126 24.6158L9.21614 24.8699C10.9115 25.9397 12.8552 26.5054 14.8374 26.5066H14.8417C20.9287 26.5066 25.883 21.24 25.8856 14.7671C25.8867 11.6303 24.7391 8.68056 22.6539 6.46176C20.5685 4.24296 17.7959 3.02034 14.8458 3.01898C8.75386 3.01898 3.79972 8.28491 3.79737 14.7576C3.79651 16.9757 4.38013 19.1356 5.48585 21.0049L5.7486 21.4492L4.63263 25.7809L8.8126 24.6158Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.5208 8.85229C11.2722 8.26448 11.0103 8.25267 10.7736 8.24245C10.58 8.23359 10.3585 8.23404 10.1374 8.23404C9.9161 8.23404 9.55636 8.32262 9.25216 8.67581C8.94775 9.02899 8.08984 9.88299 8.08984 11.6198C8.08984 13.3569 9.27972 15.0352 9.44571 15.2709C9.61169 15.5065 11.7426 19.1846 15.1172 20.5996C17.9218 21.7757 18.4924 21.5417 19.1012 21.4829C19.7101 21.4241 21.0655 20.6289 21.3421 19.8046C21.619 18.9804 21.619 18.274 21.5359 18.1262C21.4528 17.9792 21.2315 17.8909 20.8995 17.7144C20.5675 17.5379 18.9352 16.6837 18.6308 16.566C18.3264 16.4481 18.1051 16.3895 17.8838 16.7429C17.6623 17.0959 17.0265 17.8909 16.8328 18.1262C16.639 18.3621 16.4453 18.3917 16.1133 18.215C15.7813 18.038 14.7119 17.6655 13.4434 16.4629C12.4565 15.5274 11.79 14.3717 11.5962 14.0183C11.4027 13.6654 11.593 13.4909 11.7421 13.2981C12.0107 12.9508 12.4612 12.3264 12.5719 12.0911C12.6825 11.8554 12.6272 11.6494 12.5443 11.4727C12.4612 11.2962 11.8158 9.55048 11.5208 8.85229Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_176_585">
                      <rect
                        width="28"
                        height="29.77"
                        fill="white"
                        transform="translate(0.791992)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
          <div className="2xl:bg-[#EEEDED] bg-none p-10 2xl:shadow-[0px_0px_38px_0px_rgba(120,116,116,0.65)] 2xl:rounded-r-[50px] rounded-r-none">
            <form ref={form} onSubmit={sendEmail}>
              <div className="mx-auto justify-center 2xl:mt-0 mt-12 sm:inline-flex sm:gap-10 w-full">
                <div className="w-full">
                  <p className="text-contactSectionColor font-medium text-sm mb-2">
                    Nombre
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      name="form_user_name"
                      radius="lg"
                      required
                      className="peer text-sm m-0 block sm:h-[58px] w-full rounded-3xl border-2 border-solid border-contactSectionColor bg-transparent  px-6 py-4 font-normal leading-tight text-contactSectionColor transition duration-200  placeholder:text-contactSectionColor focus:border-contactSectionColor focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-contactSectionColor focus:outline-none peer-focus:text-contactSectionColor dark:focus:border-primary dark:peer-focus:text-contactSectionColor [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] h-[48px]"
                      id="floatingInput"
                      placeholder=""
                      value={formData.form_user_name}
                      onChange={handleChange}
                      title="Por favor introduzca un mínimo de 5 caracteres"
                      pattern=".{5,}"
                    />
                    <label
                      for="floatingInput"
                      className="pointer-events-none absolute left-3 top-0 origin-[0_0] border border-solid border-transparent px-3 py-2.5 sm:py-4  text-contactSectionColor transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-contactSectionColor peer-[:not(:placeholder-shown)]:-translate-y-2  peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-contactSectionColor dark:peer-focus:text-contactSectionColor"
                    >
                      Ingrese su nombre
                    </label>
                  </div>
                </div>
                <div className="w-full sm:mt-0 mt-10">
                  <p className="text-contactSectionColor font-medium text-sm mb-2">
                    Email
                  </p>
                  <div className="relative">
                    <input
                      type="email"
                      name="user_email"
                      radius="lg"
                      required
                      className="peer text-sm m-0 block sm:h-[58px] h-[48px] w-full rounded-3xl border-2 border-solid border-contactSectionColor bg-transparent px-6 py-4 font-normal leading-tight text-contactSectionColor transition duration-200  placeholder:text-contactSectionColor focus:border-contactSectionColor focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-contactSectionColor focus:outline-none peer-focus:text-contactSectionColor dark:focus:border-primary dark:peer-focus:text-contactSectionColor [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                      id="floatingInput"
                      placeholder=""
                      value={formData.user_email}
                      onChange={handleChange}
                    />
                    <label
                      for="floatingInput"
                      className="pointer-events-none absolute left-3 top-0 origin-[0_0] border border-solid border-transparent px-3 py-2.5 sm:py-4  text-contactSectionColor transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-contactSectionColor peer-[:not(:placeholder-shown)]:-translate-y-2  peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >
                      Ingrese su email
                    </label>
                  </div>
                </div>
              </div>
              <div className="mx-auto sm:mt-16 mt-10">
                <h3 className="text-contactSectionColor font-medium text-sm mb-2">
                  Mensaje
                </h3>
                <div className="relative">
                  <textarea
                    name="message"
                    radius="lg"
                    className="peer text-sm m-0 block h-[130px] w-full rounded-3xl border-2 border-solid border-contactSectionColor bg-transparent  px-6 py-4 font-normal leading-tight text-contactSectionColor transition duration-200  placeholder:text-contactSectionColor focus:border-contactSectionColor focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-contactSectionColor focus:outline-none peer-focus:text-contactSectionColor dark:focus:border-primary dark:peer-focus:text-contactSectionColor [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] resize-y"
                    id="floatingInput"
                    placeholder=""
                    required
                    value={formData.message}
                    onChange={handleChange}
                    title="Por favor introduzca un mínimo de 5 caracteres"
                    pattern=".{5,}"
                  />
                  <label
                    for="floatingInput"
                    className="pointer-events-none absolute left-3 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-colorInputsForm transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-colorInputsForm peer-[:not(:placeholder-shown)]:-translate-y-2  peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Ingrese su mensaje
                  </label>
                </div>
              </div>
              <div className="mx-auto mt-6">
                <Checkbox
                  defaultSelected
                  size="md"
                  classNames={{
                    label: "text-colorInputsForm font-normal text-sm",
                    wrapper: "",
                    icon: "text-white",
                  }}
                  color="contactSectionColor"
                  radius="sm"
                  isSelected={isSelected}
                  onValueChange={setIsSelected}

                >
                  Estoy de acuerdo con las{" "}
                  <Link href="/" className="font-black">
                    Politicas de Privacidad
                  </Link>{" "}
                  y{" "}
                  <Link href="/" className="font-black">
                    Términos de Uso.
                  </Link>
                </Checkbox>
                <p className="text-default-500"></p>
              </div>
              <div className="justify-center mx-auto flex mt-5">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptcha}
                />
              </div>
              <Button
                type="submit"
                value="Send"
                onChange={handleChange}
                className="text-white rounded-2xl bg-contactSectionColor hover:bg-transparent hover:text-contactSectionColor hover:border-contactSectionColor hover:border-2 flex mx-auto mt-9 font-bold text-sm max-w-[248px] w-full h-14"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                startContent={<svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19 9.99996C19 14.4182 14.9703 17.9999 10 17.9999C8.40255 18.0067 6.827 17.6226 5.40662 16.8799L1 17.9999L2.50525 14.4308C1.55463 13.1622 1 11.6388 1 9.99996C1 5.58169 5.02975 2 10 2C14.9703 2 19 5.58169 19 9.99996ZM6.625 8.8571H4.375V11.1428H6.625V8.8571ZM15.625 8.8571H13.375V11.1428H15.625V8.8571ZM8.875 8.8571H11.125V11.1428H8.875V8.8571Z"
                    className={hover ? styles.svgHover : styles.svgNormal}
                  />
                </svg>}
              >
                Enviar mensaje
              </Button>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
