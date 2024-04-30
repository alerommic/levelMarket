const Card = () => {
  return ( 
    <div
    className="block rounded-lg max-w-50	p-5 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
    <a href="#!">
      <img
      width="200px"
      height="500px"
        className="rounded-t-lg"
        src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
        alt="" />
        
    </a>
    <div className="px-6">
      <h5
        className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        Card title
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        fd
      </p>
      <button 
          type="button"
          className="inline-block rounded bg-neutral-900 px-6 pb-2 pt-3 
          text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 
          ransition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2
        focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0
        active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none
        dark:shadow-black/30 dark:hover:shadow-dark-strong 
          dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
          Comprar
        </button>
    </div>
  </div>
   );
}
 
export default Card;