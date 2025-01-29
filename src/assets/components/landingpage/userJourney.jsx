export default function UserJourney() {
  return (
    <>
      <div className="space-y-10  py-10  lg:mb-20">
        <div className="text-center space-y-2 sm:space-y-3 lg:space-y-4 px-10">
          <h2 className="text-3xl lg:text-4xl  font-bold">How does it work?</h2>
          <h3 className="text-xl lg:text-2xl  ">
            Mr. Cook uses artificial intelligence to generate recipes based on
            your input.
          </h3>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 px-10 sm:px-16 md:px-16 lg:px-20 gap-10  sm:text-lg lg:text-xl h-auto">
          <div className="card border-[1px] bg-base-100 h-auto shadow-xl">
            <div className="card-body  ">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2">✍️</div>
              <h2 className="card-title text-xl sm:text-2xl lg:text-3xl">
                1. Enter a prompt
              </h2>
              <p>
                Enter a recipe idea you've always wanted to try and Flavor Layer
                will create a recipe for you. You can also enter a list of
                ingredients you would like to use. Perfect to create a leftover
                recipe!
              </p>
            </div>
          </div>
          <div className="card border-[1px] bg-base-100  h-auto  shadow-xl">
            <div className="card-body">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2">✨</div>
              <h2 className="card-title text-xl sm:text-2xl lg:text-3xl">
                2. Generate a recipe
              </h2>
              <p>
                An artificial intelligence is used to create the recipe for you.
                It only takes a few seconds. The recipe will be based on the
                prompt you enter.
              </p>
            </div>
          </div>
          <div className="card border-[1px] bg-base-100 h-auto   shadow-xl">
            <div className="card-body">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2">😋</div>
              <h2 className="card-title text-xl sm:text-2xl lg:text-3xl">
                3. Enjoy your meal!
              </h2>
              <p>
                You can then cook the recipe and enjoy your meal. The recipe
                will be saved in your cookbook. You can easily share the recipe
                with your friends and family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
