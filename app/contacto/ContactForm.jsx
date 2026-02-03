"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const form = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    form_user_name: "",
    form_user_email: "",
    form_message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast("¡Por favor, demuestra que no eres un robot!", {
        icon: '🤖',
        style: { border: "2px solid #f39200", borderRadius: "1rem", color: "#f39200", fontWeight: "600" },
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
        .then(() => {
          toast.success("¡Mensaje forjado y enviado!", { duration: 3200 });
          setFormData({ form_user_name: "", form_user_email: "", form_message: "" });
          setIsSelected(false);
          recaptchaRef.current?.reset();
          setRecaptchaToken(null);
        })
        .catch(() => {
          toast.error("Hubo un error al enviar el metal al fuego.");
        });
    } else {
      toast.error("Debes aceptar las políticas de privacidad.");
    }
  };

  const openWhatsApp = () => {
    const message = "Hola, me gustaría hablar sobre un trabajo de forja.";
    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const inputLabel = "text-[#1D2721] font-black uppercase tracking-[0.2em] text-[10px] mb-3 ml-2 block";
  const inputStyle = "w-full bg-[#F8F9FA] border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none transition-all focus:border-[#497EDA] focus:bg-white text-sm font-medium text-gray-700 placeholder:text-gray-300 shadow-inner";

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[600px]">
      <Toaster position="bottom-right" />
      
      {/* PANEL IZQUIERDO: Branding y RRSS Premium */}
      <div className="lg:w-[35%] bg-[#497EDA] p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <span className="text-blue-200 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            Contacto Directo
          </span>
          <h2 className="text-white font-black text-4xl lg:text-5xl leading-[0.9] tracking-tighter uppercase mb-6">
            Forjemos <br /> Algo <br /> Grande
          </h2>
          <div className="w-16 h-2 bg-[#C93400] rounded-full" />
        </div>

        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium leading-relaxed mb-10 max-w-[200px]">
            Síguenos o escríbenos directamente para asesoría inmediata.
          </p>
          
          {/* BOTONES RRSS REDISEÑADOS */}
          <div className="flex items-center gap-5">
            <Link 
              href="https://www.facebook.com/elartedeforjarelhierro" 
              target="_blank" 
              className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white transition-all duration-300 hover:bg-white hover:text-[#497EDA] hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20"
            >
              <FacebookIcon />
            </Link>
            
            <button 
              onClick={openWhatsApp} 
              className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:-translate-y-2 hover:shadow-xl hover:shadow-green-900/20"
            >
              <WhatsAppIcon />
            </button>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO: Formulario */}
      <div className="flex-1 p-10 lg:p-16 bg-white">
        <form ref={form} onSubmit={sendEmail} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={inputLabel}>Nombre</label>
              <input type="text" name="form_user_name" required className={inputStyle} placeholder="Ingrese su nombre" value={formData.form_user_name} onChange={handleChange} />
            </div>
            <div>
              <label className={inputLabel}>Email</label>
              <input type="email" name="form_user_email" required className={inputStyle} placeholder="Ingrese su email" value={formData.form_user_email} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className={inputLabel}>Mensaje</label>
            <textarea name="form_message" required className={`${inputStyle} h-44 resize-none`} placeholder="Escriba aquí su mensaje..." value={formData.form_message} onChange={handleChange} />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
            <div className="flex items-start gap-3 group">
              <input
                type="checkbox"
                id="privacy"
                checked={isSelected}
                onChange={(e) => setIsSelected(e.target.checked)}
                className="mt-1 w-5 h-5 accent-[#497EDA] cursor-pointer"
              />
              <label htmlFor="privacy" className="text-[10px] text-gray-400 font-bold uppercase tracking-tight cursor-pointer leading-tight">
                Acepto las <Link href="/politicas" className="text-[#497EDA] hover:underline">Políticas de Privacidad</Link>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-10 h-16 bg-[#C93400] text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.25em] shadow-2xl shadow-orange-900/30 hover:bg-[#A32A00] transition-all duration-300 active:scale-95 flex items-center justify-center gap-4"
            >
              <SubmitIcon />
              Enviar mensaje
            </button>
          </div>

          <div className="flex justify-center md:justify-start pt-4">
            <div className="rounded-xl overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 shadow-sm border border-gray-100">
              <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} onChange={handleRecaptcha} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ICONOS OFICIALES REDISEÑADOS
const FacebookIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.035c0 2.123.548 4.197 1.591 6.027L0 24l6.135-1.61a11.802 11.802 0 005.91 1.586h.005c6.637 0 12.032-5.396 12.035-12.037a11.848 11.848 0 00-3.417-8.507z"/>
  </svg>
);

const SubmitIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);