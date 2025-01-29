export default function Discover() {
  return (
    <>
      <div className=" text-center  flex flex-col items-center justify-center  gap-20 ">
        <div className="w-full lg:w-2/3 xl:w-1/2">
          <h2 className="text-primary text-2xl font-bold">
            Over 99,000 recipes created
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5">
            Discover the best free recipe generator
          </h3>
          <h4 className="text-md sm:text-lg lg:text-xl px-10 lg:px-10 xl:px-20 ">
            Unlock personalized recipes, reduce food waste, and enhance your
            culinary skills with our AI-powered kitchen companion. Effortless,
            efficient, and convenient cooking at your fingertips.
          </h4>
        </div>
        <div></div>
      </div>
      <div className="px-5 lg:px-20 space-y-10 ">
        {/* card 1 */}
        <div className="card card-side bg-base-100 shadow-xl">
          <figure className="w-full lg:w-1/2">
            <img
              src="https://www.mrcook.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffridge.a2b0b84e.png&w=1080&q=75"
              alt="Cooking"
              className="object-cover w-full h-full"
            />
          </figure>

          <div className="card-body w-full ">
            <h2 className="card-title text-2xl lg:text-3xl font-bold">
              Minimise food waste and save money
            </h2>
            <p className="text-sm lg:text-lg">
              Are you tired of throwing away unused ingredients? AI-generated
              recipes put an end to food waste. They make the most of what's in
              your kitchen, ensuring that every item is used in a delicious
              dish.
            </p>
            <p className="text-sm lg:text-lg">
              Say goodbye to the guilt of wilted greens and overripe fruit.
              Embrace AI-powered sustainable cooking and reduce your carbon
              footprint, one recipe at a time.
            </p>
            <p className="text-sm lg:text-lg">
              On average, a family of four throws away $1,500 worth of food each
              year.
            </p>
          </div>
        </div>
        {/* card 2 */}
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body w-full ">
            <h2 className="card-title text-2xl lg:text-3xl font-bold">
              Save time and enjoy convenience
            </h2>
            <p className="text-sm lg:text-lg">
              With AI in your kitchen, meal preparation is easy. No more
              worrying about planning or finding ingredients. Our AI recipe
              generator saves time and is convenient.
            </p>
            <p className="text-sm lg:text-lg">
              The AI suggests recipes based on your available ingredients, so
              you don't have to spend more time in the supermarket. This means
              you have more time to enjoy the cooking process. Say goodbye to
              last-minute dashes to grab missing ingredients. Our platform has
              time-saving recipes that make cooking easier.
            </p>
            <p className="text-sm lg:text-lg">
              Whether you're a busy professional, a multitasking parent or
              someone who values efficiency, the convenience of AI is essential.
              Embark on a hassle-free culinary journey with AI as your trusted
              kitchen companion. Discover the world of easy cooking by relying
              on AI.
            </p>
          </div>
          <figure className="w-full lg:w-1/2">
            <img
              src="https://www.mrcook.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhourglass.6eef8837.png&w=1080&q=75"
              alt="Cooking"
              className="object-cover w-full h-full"
            />
          </figure>
        </div>
        {/* card-3 */}
        <div className="card card-side bg-base-100 shadow-xl">
          <figure className="w-full lg:w-1/2">
            <img
              src="https://www.mrcook.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcooking-skills.4675888f.png&w=384&q=75"
              alt="Cooking"
              className="object-cover w-full h-full"
            />
          </figure>

          <div className="card-body w-full ">
            <h2 className="card-title text-2xl lg:text-3xl font-bold">
              Improve your cooking skills
            </h2>
            <p className="text-sm lg:text-lg">
              Cooking is more than a task; it's a continual opportunity to
              learn. AI is your partner in the kitchen, helping you develop as a
              cook.
            </p>
            <p className="text-sm lg:text-lg">
              If you're new to cooking, AI offers easy-to-follow guidance to
              develop your abilities and boost your assurance. For experienced
              chefs, AI presents knowledgeable pointers and imaginative thoughts
              to elevate your dishes.
            </p>
            <p className="text-sm lg:text-lg">
              The flexibility of AI empowers you to discover new styles and
              skills, making cooking a thrilling journey. It's like having your
              own personal cooking guide in your kitchen, motivating you to
              become the chef you've always dreamed of being.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
