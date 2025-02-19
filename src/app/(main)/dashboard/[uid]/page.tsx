"use client";

interface ProjectProps {
  params: {
    uid: string;
    projectname: string;
  };
}

export default function Project({ params }: ProjectProps) {
  const { uid } = params;

  return (
    <div className="text-3xl text-white">
      <p>User ID: {uid}</p>
    </div>
  );
}
