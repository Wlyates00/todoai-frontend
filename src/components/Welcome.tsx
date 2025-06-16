import { Link } from "react-router-dom"
import { useUser } from "../contexts/UserContext"

function Welcome() {
    const user = useUser()

    console.log("Welcome component rendered, user:", user)

  return (
    <div className="flex flex-col w-full h-full items-center justify-center text-black dark:text-white">
        <h1 className="text-4xl font-bold m-2">Welcome to Todo AI</h1>
        <div className="flex flex-wrap items-stretch gap-8 w-full items-center justify-center text-black dark:text-white p-4">
            {/* Benefits Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-sm flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Why use Todo AI?</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                <li>Smart task analysis and prioritization</li>
                <li>Personalized productivity tips</li>
                <li>Easy organization of all your lists</li>
                <li>Seamless dark mode for any environment</li>
                </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-sm flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Get started now!</h2>
                <p className="mb-6 text-gray-700 dark:text-gray-200 text-center">
                Start organizing your life with AI-powered productivity.
                </p>
                <div className="w-full flex justify-center"></div>
                {!user && <Link to="/login" className={`pl-2 pr-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition leading-5`}>
                    Sign In / <br/> &nbsp;&nbsp;&nbsp;&nbsp; Sign Up
                </Link>}
            </div>
        </div>
    </div>)
}

export default Welcome