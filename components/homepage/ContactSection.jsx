"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactSection() {
  const formRef = useRef();
  const recaptchaRef = useRef();
  
  const [isSelected, setIsSelected] = useState(false);
  const [formData, setFormData] = useState({
    form_user_name: '',
    form_user_email: '',
    form_message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!isSelected) {
      toast.error("Debes aceptar las políticas de privacidad.");
      return;
    }

    const captchaValue = recaptchaRef.current?.getValue();
    if (!captchaValue) {
      toast("¡Por favor, demuestra que eres humano!", {
        icon: '🤖',
        style: { border: "2px solid #C93400", color: "#C93400", fontWeight: "800", borderRadius: "1.5rem" }
      });
      return;
    }

    try {
      if (
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID &&
        formRef.current
      ) {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          formRef.current,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        );

        toast.success("¡Mensaje forjado con éxito!", {
          style: { border: "2px solid #497EDA", borderRadius: "1.5rem", color: "#497EDA", fontWeight: "800" }
        });

        setFormData({ form_user_name: '', form_user_email: '', form_message: '' });
        setIsSelected(false);
        recaptchaRef.current.reset();
      }
    } catch (error) {
      toast.error("Hubo un problema al enviar el metal al fuego.");
    }
  };

  const inputContainer = "relative mb-6";
  const inputClasses = `peer w-full bg-[#F8F9FA] text-[#1D2721] text-sm font-medium rounded-2xl border-2 border-gray-100 px-6 py-4 outline-none transition-all duration-300 focus:border-[#497EDA] focus:bg-white placeholder-transparent shadow-sm`;
  const labelClasses = `absolute left-6 top-4 text-gray-400 text-sm font-bold pointer-events-none transition-all duration-300 peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-[#497EDA] peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs uppercase tracking-widest`;

  return (
    <div className="w-full bg-white rounded-[2.5rem] overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        
        {/* LADO IZQUIERDO: Info de contacto visual - AHORA ADAPTABLE */}
        <div className="w-full lg:w-1/3 bg-[#497EDA] p-8 md:p-12 flex flex-col justify-between text-white">
          <div className="mb-10 lg:mb-0">
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 uppercase">¿Listo para empezar?</h3>
            <p className="text-blue-100 text-sm leading-relaxed font-medium">
              Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
            </p>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-3 rounded-xl">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold tracking-wider break-all">elartedeforjar@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold tracking-wider">Sardinal de Carrillo, Guanacaste</span>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Formulario */}
        <div className="flex-1 p-6 md:p-8 lg:p-16">
          <form ref={formRef} onSubmit={sendEmail} className="w-full">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
              <div className={inputContainer}>
                <input type="text" name="form_user_name" required className={inputClasses} placeholder="Nombre" value={formData.form_user_name} onChange={handleChange} />
                <label className={labelClasses}>Nombre Completo</label>
              </div>

              <div className={inputContainer}>
                <input type="email" name="form_user_email" required className={inputClasses} placeholder="Email" value={formData.form_user_email} onChange={handleChange} />
                <label className={labelClasses}>Correo Electrónico</label>
              </div>
            </div>

            <div className={inputContainer}>
              <textarea name="form_message" required className={`${inputClasses} h-40 resize-none`} placeholder="Mensaje" value={formData.form_message} onChange={handleChange} />
              <label className={labelClasses}>¿En qué podemos ayudarte?</label>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
              <div className="flex items-center gap-3 group self-start md:self-center">
                <label className="flex items-center cursor-pointer relative">
                  <input type="checkbox" className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-200 checked:bg-[#497EDA] checked:border-[#497EDA] transition-all duration-300" checked={isSelected} onChange={(e) => setIsSelected(e.target.checked)} />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </label>
                <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-tighter">
                  Acepto las <Link href="/politicas" className="text-[#497EDA] underline decoration-2 underline-offset-4">Políticas de Privacidad</Link>
                </p>
              </div>

              <button type="submit" className="w-full md:w-auto px-10 h-16 bg-[#C93400] text-white rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-orange-900/20 hover:bg-[#A32A00] hover:-translate-y-1 transition-all duration-300 active:scale-95">
                Enviar Proyecto
              </button>
            </div>

            <div className="flex justify-center md:justify-start mt-8 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden">
              <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} />
            </div>
          </form>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}