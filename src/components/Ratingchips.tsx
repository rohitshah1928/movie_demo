
const Ratingchips = ({ctext}:any) => {
  return (
    <div
    data-te-chip-init
    data-te-ripple-init
    className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px]  min-w-[40%] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
    data-te-close="true">
   {ctext}
</div>
  )
}

export default Ratingchips