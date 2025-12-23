import React, { memo } from 'react';


//    ====== CSS TW BUTTONS Xanh lá  ======


// React.ButtonHTMLAttributes<HTMLButtonElement> cho phép components nhận tất cả các thuộc tính của thẻ <button> HTML (onClick, disabled, type,...)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // 'children' là nội dung nằm giữa thẻ <Button>...</Button>
}

const ButtonAdd: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const baseClasses = `
    w-full bg-accent text-accent-foreground font-bold py-3 rounded-full inline-block
    cursor-pointer shadow-lg transition-all duration-200
    hover:brightness-90 dark:hover:brightness-110 hover:scale-105
    disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100
  `;

  return (
    <button className={`${baseClasses} ${className || ''}`} {...props}>
      {children}
    </button>

    // Dạng viết cũ
    // <button className="bg-[#ff6702] w-[120px] h-[40px] text-[16px] rounded-[50px] inline-block transition-[0.2s_all] shadow-[0_5px_10px_gray] cursor-pointer border-[3px_solid_white] font-[1000] tracking-[1px] text-[white] text-[20px] font-['Times_New_Roman',Times,serif] 
    // md:h-[45px] md:w-[135px] md:text-[18px] md:mb-[30px]
    // lg:h-[50px] lg:w-[150px] lg:mb-[50px] lg:mt-[10px] ">

  );
}

export default memo(ButtonAdd);
