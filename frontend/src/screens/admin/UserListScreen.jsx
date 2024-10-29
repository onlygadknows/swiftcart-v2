import { useEffect } from "react";
import TableLoader from "../../components/TableLoader";
import { useDispatch } from "react-redux";
import Message from "../../components/Message";
import { LuLoader2 } from "react-icons/lu";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import { Link } from "react-router-dom";

const UserListScreen = () => {
  const { data: products, isLoading, refetch, error } = useGetProductsQuery();
  const {
    data: users,
    isLoading: isUsersLoading,
    refetch: usersRefech,
    error: isUsersError,
  } = useGetUsersQuery();

  const [
    deleteUser,
    { isLoading: loadingDelete, refetch: refetchDelete, error: errorDelete },
  ] = useDeleteUserMutation();

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteUser(productId);
        refetch();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    usersRefech()
  }, []);

  return isUsersLoading ? (
    <TableLoader />
  ) : isUsersError ? (
    <div className="mx-auto overflow-x-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:max-w-7xl lg:px-8">
      <Message variant="alert" message={"Something went wrong!"} />
    </div>
  ) : !users || users.length === 0 ? (
    <div className="bg-white w-full">
      <div className="mx-auto overflow-x-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:max-w-7xl lg:px-8">
        <Message variant="alert" message={"No products!"} />
      </div>
    </div>
  ) : (
    <div className="bg-white w-full">
      <div className="mx-auto overflow-x-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-lora mb-4 text-gray-700">
            Account &gt; Users
          </h2>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-lora">
                Id
              </th>
              <th scope="col" className="px-6 py-3 font-lora">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-lora">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-lora">
                Admin
              </th>

              <th scope="col" className="px-6 py-3 font-lora">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-normal font-poppins">
                  {user._id}
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  {user.name}
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  {user.email}
                </td>
                <td className="px-6 py-4 font-normal font-poppins">
                  {user.isAdmin ? <span>admin</span> : <span>not admin</span>}
                </td>

                <td className="px-6 py-4 font-normal font-poppins">
                  <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                    <Link to={`/admin/user/${user._id}`}>
                      <button
                        className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                        title="Edit Product"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                    </Link>

                    <button
                      className="inline-block p-3 text-gray-700 hover:bg-gray-50 hover:text-red-500 focus:relative"
                      title="Delete Product"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListScreen;