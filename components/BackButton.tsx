import { useRouter } from 'next/router';
import { Button } from '@nextui-org/react';
import styles from "./BackButton.module.css"
import Link from 'next/link';
const BackButton = ({...props}) => {
  const router = useRouter();

  return (
    <Button as={Link} href={props.route} className={`flex gap-2 items-center align-middle w-full ${styles.goback_btn}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 40" fill="none">
        <path d="M29.64 38.36L11.32 20L29.64 1.64L24 -4L0 20L24 44L29.64 38.36Z" fill="white" />
      </svg>
      <span className='lg:text-xl'>{props.text}</span>
    </Button>
  );
};

export default BackButton;