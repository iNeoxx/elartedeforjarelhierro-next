import data from './cardServices.json'
export default function Servicios(){
    return(
        <section className="bg-slate-100 py-16">
            <div className="text-center">
            <h2 className="font-bold max-[1024px]:text-2xl  lg:text-5xl">Nuestros Servicios</h2>
            </div>
            <div className=" pt-20 grid justify-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {data.map((card =>
                        <div className="mb-10 cursor-pointer block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="py-5">
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
                        </div>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{card.content}</p>
                        <div className="py-5 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <g clip-path="url(#clip0_44_781)">
                        <path d="M16.0288 0.944116L16.2058 0.767179C16.339 0.63408 16.497 0.528515 16.671 0.456513C16.845 0.38451 17.0314 0.347479 17.2197 0.347534C17.408 0.347589 17.5944 0.38473 17.7684 0.456834C17.9423 0.528939 18.1003 0.634596 18.2334 0.767772C18.3665 0.900949 18.4721 1.05904 18.5441 1.23301C18.6161 1.40699 18.6531 1.59344 18.6531 1.78172C18.653 1.97001 18.6159 2.15644 18.5438 2.33037C18.4717 2.5043 18.366 2.66233 18.2328 2.79543L18.0559 2.97118C18.3586 3.31064 18.5199 3.75302 18.5069 4.20764C18.4939 4.66225 18.3075 5.09467 17.9858 5.41624L5.76409 17.6392C5.68769 17.7152 5.59204 17.769 5.4874 17.7947L0.737403 18.9822C0.638 19.007 0.533884 19.0056 0.435176 18.9782C0.336467 18.9508 0.246524 18.8984 0.174089 18.8259C0.101655 18.7535 0.0491924 18.6636 0.0218022 18.5648C-0.00558799 18.4661 -0.00697427 18.362 0.0177781 18.2626L1.20528 13.5126C1.23126 13.4084 1.28502 13.3132 1.36084 13.2371L12.8107 1.78724C12.6962 1.70665 12.5569 1.66912 12.4174 1.68128C12.2779 1.69345 12.1472 1.75454 12.0483 1.85374L8.13909 5.76418C8.08389 5.81938 8.01835 5.86317 7.94622 5.89305C7.87409 5.92293 7.79679 5.9383 7.71872 5.9383C7.64064 5.9383 7.56334 5.92293 7.49121 5.89305C7.41908 5.86317 7.35354 5.81938 7.29834 5.76418C7.24314 5.70897 7.19935 5.64344 7.16947 5.57131C7.13959 5.49918 7.12422 5.42188 7.12422 5.3438C7.12422 5.26573 7.13959 5.18843 7.16947 5.1163C7.19935 5.04417 7.24314 4.97863 7.29834 4.92343L11.21 1.01418C11.5317 0.692384 11.9645 0.505953 12.4194 0.493146C12.8743 0.480338 13.3168 0.642125 13.6562 0.945304C13.9825 0.6537 14.4047 0.492405 14.8423 0.492186C15.2799 0.491967 15.7023 0.652839 16.0288 0.944116ZM15.2641 1.85374C15.1527 1.74243 15.0017 1.6799 14.8443 1.6799C14.6869 1.6799 14.5359 1.74243 14.4245 1.85374L2.31559 13.9603L1.40834 17.5905L5.03853 16.6832L17.1475 4.57668C17.2028 4.52152 17.2466 4.456 17.2766 4.38387C17.3065 4.31173 17.3219 4.2344 17.3219 4.1563C17.3219 4.07821 17.3065 4.00087 17.2766 3.92874C17.2466 3.8566 17.2028 3.79108 17.1475 3.73593L15.2653 1.85374H15.2641Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_44_781">
                        <rect width="19" height="19" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <p className="pl-2 font-bold text-gray-700 dark:text-gray-400">{card.footer}</p>
                        </div>
                        </div>
                    ))}
            </div>
        </section>
    )
}