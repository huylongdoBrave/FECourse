// import React from 'react';
// import { NavLink } from "react-router-dom";

// // --- Dữ liệu giả lập cho thư viện ảnh ---
// const galleryItems = [
//   { id: 1, src: 'https://picsum.photos/id/237/400/300', description: 'Описание или пояснение к изображению.' }, // Item đầu tiên có mô tả
//   { id: 2, src: 'https://picsum.photos/id/10/400/500' },
//   { id: 3, src: 'https://picsum.photos/id/11/400/500' },
//   { id: 4, src: 'https://picsum.photos/id/12/400/500' },
//   { id: 5, src: 'https://picsum.photos/id/13/400/500' },
//   { id: 6, src: 'https://picsum.photos/id/14/400/500' },
//   { id: 7, src: 'https://picsum.photos/id/15/400/500' },
//   { id: 8, src: 'https://picsum.photos/id/16/400/500' },
//   { id: 9, src: 'https://picsum.photos/id/17/400/500' },
//   { id: 10, src: 'https://picsum.photos/id/18/400/300' },
// ];

// const NavLink = ({ text, isActive }) => (
//   <a
//     href="#"
//     className={`text-xs uppercase tracking-widest hover:text-gray-900 transition-colors pb-1
//       ${isActive ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500'}`}
//   >
//     {text}
//   </a>
// );

// const FooterColumn = ({ title, children }) => (
//   <div className="flex flex-col space-y-4">
//     <h5 className="font-bold text-white uppercase tracking-wider">{title}</h5>
//     <div className="flex flex-col space-y-2 text-sm text-gray-400">
//       {children}
//     </div>
//   </div>
// );

// function App() {
//   return (
//     <div className="min-h-screen font-sans bg-white">
//       {/* ================= HEADER ================= */}
//       <header className="container mx-auto px-4 py-6 md:py-10">
//         {/* Responsive: Flex cột trên mobile, flex hàng trên tablet trở lên */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//           {/* Logo Area */}
//           <div className="flex flex-col items-center md:items-start uppercase font-bold tracking-[0.2em] text-sm text-gray-900 leading-tight">
//             <span>IIA</span>
//             <span>DIGITAL PROJECT</span>
//           </div>

//           {/* Navigation */}
//           <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
//             <NavLink text="Главная" isActive={true} />
//             <NavLink text="Галерея" />
//             <NavLink text="Проекты" />
//             <NavLink text="Сертификаты" />
//             <NavLink text="Контакты" />
//           </nav>
//         </div>
//       </header>

//       {/* ================= MAIN CONTENT (GALLERY) ================= */}
//       <main className="container mx-auto px-4 py-12 md:py-20">
//         {/* Section Title */}
//         <div className="mb-12 md:mb-20 uppercase text-4xl md:text-5xl lg:text-6xl">
//           <h1 className="font-light text-gray-300 mb-2">Галерея</h1>
//           <h2 className="font-extrabold text-gray-900">Фотографий</h2>
//         </div>

//         {/* Gallery Grid */}
//         {/* Responsive Grid:
//             - Mặc định (Mobile): 1 cột (grid-cols-1)
//             - Tablet (md:): 3 cột (grid-cols-3)
//             - Desktop (xl:): 5 cột (grid-cols-5) - giống thiết kế gốc
//         */}
//         <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
//           {galleryItems.map((item, index) => (
//             <div key={item.id} className="flex flex-col h-full">
//               {/* Image Container - dùng aspect ratio để ảnh đều nhau hơn */}
//               <div className="relative w-full h-64 md:h-80 bg-gray-100 overflow-hidden">
//                  <img 
//                    src={item.src} 
//                    alt={`Gallery item ${item.id}`}
//                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
//                  />
//               </div>
              
//               {/* Special description box for the first item only */}
//               {index === 0 && item.description && (
//                 <div className="mt-4 p-4 bg-gray-50 text-sm text-gray-600">
//                   {item.description}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center space-x-8 py-8 border-t border-gray-100">
//           <div className="text-2xl font-light text-gray-400">
//             <span className="text-gray-900 font-normal">01</span> / 05
//           </div>
//           <div className="flex space-x-2">
//             <button className="p-3 border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition">
//               {/* Mũi tên trái */}
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
//               </svg>
//             </button>
//             <button className="p-3 border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition">
//                {/* Mũi tên phải */}
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* ================= FOOTER ================= */}
//       <footer className="bg-[#2C2C2C] text-gray-400 pt-16 pb-8">
//         <div className="container mx-auto px-4">
//           {/* Footer Grid Component */}
//           {/* Responsive: 1 cột trên mobile, 2 cột tablet, 4 cột desktop */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-16">
            
//             {/* Col 1: Logo */}
//             <div className="flex flex-col items-start uppercase font-bold tracking-[0.2em] text-sm text-white leading-tight">
//                <span>IIA</span>
//                <span>DIGITAL PROJECT</span>
//             </div>

//             {/* Col 2: Thông tin */}
//             <FooterColumn title="Информация">
//               <a href="#" className="hover:text-white">Главная</a>
//               <a href="#" className="hover:text-white">Галерея</a>
//               <a href="#" className="hover:text-white">Проекты</a>
//               <a href="#" className="hover:text-white">Сертификаты</a>
//               <a href="#" className="hover:text-white">Контакты</a>
//             </FooterColumn>

//             {/* Col 3: Контакты (Dùng emoji thay icon tạm thời) */}
//             <FooterColumn title="Контакты">
//               <div className="flex items-start">
//                 <span className="mr-3 mt-1">📍</span>
//                 <p>100000, Республика Казахстан,<br/>г. Караганда, ул. Телевизионная 10</p>
//               </div>
//               <div className="flex items-center">
//                  <span className="mr-3">📞</span>
//                 <p>+7 (701) 77 76 811</p>
//               </div>
//               <div className="flex items-center">
//                 <span className="mr-3">✉️</span>
//                 <p>Galym.sultanov@mail.ru</p>
//               </div>
//             </FooterColumn>

//              {/* Col 4: Mạng xã hội (Dùng text thay icon tạm thời) */}
//             <FooterColumn title="Социальные сети">
//                <div className="flex space-x-6 mt-2">
//                   <a href="#" className="hover:text-white transition">Facebook</a>
//                   <a href="#" className="hover:text-white transition">Twitter</a>
//                   <a href="#" className="hover:text-white transition">LinkedIn</a>
//                   <a href="#" className="hover:text-white transition">Pinterest</a>
//                </div>
//             </FooterColumn>
//           </div>

//           {/* Copyright Line */}
//           <div className="border-t border-gray-700 pt-8 text-xs text-center md:text-left text-gray-500">
//             <p>© 2019 Digital Project. Все права защищены.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;