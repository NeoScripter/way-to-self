import UserLayout from "@/layouts/user/user-layout";

export default function Home () {
    return (
        <UserLayout layoutClass="text-text-black bg-main-page-bg" pageClass="px-4 sm:px-11 lg:px-25 2xl:px-40">
            <div className="">This is home page</div>
        </UserLayout>
    )
}
