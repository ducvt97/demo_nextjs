import React from "react";

interface ButtonInfo {
  link: string;
  text: string;
}

interface Props extends React.PropsWithChildren {
  title: string;
  button: ButtonInfo;
  children?: React.ReactNode;
}

const InfoBox: React.FC<Props> = ({ title, button, children }) => {
  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-md">
      <h2 className="text-gray-800 text-2xl font-bold">{title}</h2>
      <p className="text-gray-800 mt-2 mb-4">{children}</p>
      <a
        href={button.link}
        className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:opacity-80"
      >
        {button.text}
      </a>
    </div>
  );
};

export default InfoBox;
