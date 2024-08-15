export function Detail() {
  return (
    <section>
      <div className="flex justify-between">
        <div className="w-[25%]">
          <div className="bg-[#ebecec] py-10 px-5 rounded-lg flex w-full flex justify-center">
            <div className="flex">
              <div className="bg-[#d1dadd] rounded-full w-28 h-28 flex justify-center items-center">
                <p className="font-[500] text-4xl">LE</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="w-[70%]">
          <div>
            <p className="font-bold">Email</p>
            <p>lewojol746@raotus.com</p>
          </div>

          <div className="mt-5">
            <p className="font-bold">Phone</p>
            <p>lewojol746@raotus.com</p>
          </div>

          <div className="mt-5">
            <p className="font-bold">Location</p>
            <p>Nigeria</p>
          </div>
        </div>
      </div>
    </section>
  );
}
