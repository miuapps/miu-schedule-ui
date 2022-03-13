export default function BlockForm() {
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Block Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Block's public details. All fields are required.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <div className="sm:col-span-3">
                <label
                  htmlFor="block-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Block Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="block-name"
                    id="block-name"
                    autoComplete="block-name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <br/>
            <div className="sm:col-span-2">
              <label
                htmlFor="start-name"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="start-date"
                    id="start-date"
                  autoComplete="start-date"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="end-date"
                  id="end-date"
                  autoComplete="end-date"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
