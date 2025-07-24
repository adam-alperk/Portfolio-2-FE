import Scene3D from "@/src/components/Scene3D";
import InteractiveScene from "@/src/components/InteractiveScene";
import AnimatedLayout from "@/src/components/AnimatedLayout";
import { getProjects } from "@/src/lib/strapi";

export default async function Home() {
  const projects = await getProjects();

  return (
    <AnimatedLayout>
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-200 dark:from-stone-900 dark:via-neutral-900 dark:to-stone-800">
        <section className="h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4">
            <div className="space-y-6 flex flex-col justify-center">
              <div className="space-y-4">
                <h2 className="text-xl font-light text-neutral-500 dark:text-neutral-400">
                  Full Stack Developer
                </h2>
                <h3 className="text-lg font-light text-neutral-400 dark:text-neutral-500">
                  Sound Designer & 3D Artist
                </h3>
              </div>
              <p className="text-base text-neutral-600 dark:text-neutral-300 opacity-75 max-w-md leading-relaxed">
                Creating immersive digital experiences through code, sound, and
                visual artistry.
              </p>
            </div>
            <div className="h-96 relative">
              <InteractiveScene />
            </div>
          </div>
        </section>
      </div>
    </AnimatedLayout>
  );
}
