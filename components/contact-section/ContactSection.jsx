import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser"
import { Button, Checkbox } from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';
import styles from './ContactSection.module.css'
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha"


export default function ContactSection() {
  const form = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaReft = useRef(null);

  const [formData, setFormData] = useState({
    form_user_name: '',
    form_user_email: '',
    form_message: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
  }

  const sendEmail = (e) => {
    e.preventDefault();

    if(!recaptchaToken) {
      toast("Por favor, completa el reCAPTCHA!", {
        style: {
          border: "2px solid #f39200",
          borderRadius: "1rem",
          backgroundColor: "white",
          color: "#f39200",
          fontWeight: "600",
          padding: "15px",
          fontSize: "1rem",
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
        .then(toast.success("Se envió el formulario con exito!",{
          style: {
            border: "2px solid #43ce14",
            borderRadius: "1rem",
            backgroundColor: "white",
            color: "#43ce14",
            fontWeight: "600",
            padding: "15px",
            fontSize: "1rem"
          },
          duration: 3200
        }),
        setFormData({
          form_user_name: '',
          form_user_email: '',
          form_message: '',
        }),
        setIsSelected(false),
        );
    } else {
      toast.error("No se pudo enviar el formulario!",{
        style: {
          border: "2px solid #Dc0b0b",
          borderRadius: "1rem",
          backgroundColor: "white",
          color: "#ff0000",
          fontWeight: "600",
          padding: "15px",
          fontSize: "1rem",
          boxShadow: "0px 0px 20px 4px rgba(0,0,0,0.78);"
        },
        duration: 3200
      });
    }
    if (recaptchaReft.current) {
      recaptchaReft.current.reset();
      setRecaptchaToken(null);
    }
  };

  return (
    <div className="bg-contactSectionColor max-w-4xl  mx-auto max-[930px]:mx-3 rounded-3xl pb-8 shadow-contactShadow mt-[6rem] sm:mb-32 mb-24">
      <h2 className="font-bold text-2xl sm:text-5xl text-white text-center pt-5 sm:pt-12 pb-6 sm:pb-10">
        Contacta con nosotros
      </h2>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="max-w-xl mx-auto max-[630px]:mx-8"
      >
        <div className="mx-auto p-2">
          <p className="text-white font-medium text-sm mb-2">Nombre</p>
          <div className="relative">
            <input
              type="text"
              name="form_user_name"
              radius="lg"
              required
              className={`peer text-sm m-0 block sm:h-[58px] w-full rounded-3xl border-2 border-solid border-white bg-colorInputsForm  px-6 py-4 font-normal leading-tight text-white transition duration-200  placeholder:text-white focus:border-white focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-white focus:outline-none peer-focus:text-white dark:focus:border-primary dark:peer-focus:text-white [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] h-[48px] ${styles.autofill_bg}`}
              id="floatingInput"
              placeholder=""
              value={formData.form_user_name}
              onChange={handleChange}
              title="Por favor introduzca un mínimo de 5 caracteres"
              pattern=".{5,}"
            />
            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-3 top-0 origin-[0_0] border border-solid border-transparent px-3 py-2.5 sm:py-4  text-white transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-white peer-[:not(:placeholder-shown)]:-translate-y-2  peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Ingrese su nombre
            </label>
          </div>
        </div>
        <div className="mx-auto p-2">
          <p className="text-white font-medium text-sm mb-2">Email</p>
          <div className="relative">
            <input
              type="email"
              name="form_user_email"
              radius="lg"
              required
              className={`peer text-sm m-0 block sm:h-[58px] h-[48px] w-full rounded-3xl border-2 border-solid border-white bg-colorInputsForm  px-6 py-4 font-normal leading-tight text-white transition duration-200  placeholder:text-white focus:border-white focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-white focus:outline-none peer-focus:text-white dark:focus:border-primary dark:peer-focus:text-white [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] ${styles.autofill_bg}`}
              id="floatingInput"
              placeholder=""
              value={formData.form_user_email}
              onChange={handleChange}
            />
            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-3 top-0 origin-[0_0] border border-solid border-transparent px-3 py-2.5 sm:py-4  text-white transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-white peer-[:not(:placeholder-shown)]:-translate-y-2  peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Ingrese su email
            </label>
          </div>
        </div>
        <div className="mx-auto p-2">
          <h3 className="text-white font-medium text-sm mb-2">Mensaje</h3>
          <div className="relative">
            <textarea
              name="form_message"
              radius="lg"
              className="peer text-sm m-0 block h-[110px] w-full rounded-3xl border-2 border-solid border-white bg-colorInputsForm  px-6 py-4 font-normal leading-tight text-white transition duration-200  placeholder:text-white focus:border-white focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-white focus:outline-none peer-focus:text-white dark:focus:border-primary dark:peer-focus:text-white [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] resize-y"
              id="floatingInput"
              placeholder=""
              required
              value={formData.form_message}
              onChange={handleChange}
              title="Por favor introduzca un mínimo de 5 caracteres"
              pattern=".{5,}"
            />
            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-3 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-white transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-white peer-[:not(:placeholder-shown)]:-translate-y-2  peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Ingrese su mensaje
            </label>
          </div>
        </div>
        <div className="mx-auto p-2">
          <Checkbox
            defaultSelected
            size="md"
            classNames={{
              label: "text-white font-normal text-sm",
              wrapper: "",
              icon: "text-contactSectionColor border-none",
            }}
            color="default"
            radius="sm"
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            Estoy de acuerdo con las <Link href="politicas-de-privacidad-y-terminos-de-uso" className="font-black">Politicas de Privacidad</Link> y <Link href="politicas-de-privacidad-y-terminos-de-uso" className="font-black">Términos de Uso.</Link>
          </Checkbox>
          <p className="text-default-500"></p>
        </div>
        <div className="justify-center mx-auto flex mt-5">
            <ReCAPTCHA
              ref={recaptchaReft}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptcha}
            />
        </div>
        <Button
          type="submit"
          value="Send"
          onChange={handleChange}
          className={`text-black rounded-2xl hover:text-white bg-white hover:bg-transparent hover:border-white hover:border-2 flex mx-auto mt-8 font-bold text-sm max-w-[248px] w-full h-14 ${styles.svgHover}`}
        >
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.6653 9.99996C16.6653 14.4182 13.2368 17.9999 9.00806 17.9999C7.64894 18.0067 6.30845 17.6226 5.09998 16.8799L1.3508 17.9999L2.63148 14.4308C1.82268 13.1622 1.3508 11.6388 1.3508 9.99996C1.3508 5.58169 4.77934 2 9.00806 2C13.2368 2 16.6653 5.58169 16.6653 9.99996ZM6.13659 8.8571H4.22227V11.1428H6.13659V8.8571ZM13.7938 8.8571H11.8795V11.1428H13.7938V8.8571ZM8.0509 8.8571H9.96522V11.1428H8.0509V8.8571Z"
            />
          </svg>
          Enviar mensaje
        </Button>
        <Toaster
        />
      </form>
    </div>
  );
}
