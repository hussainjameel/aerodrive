import { useState, useEffect, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useStore } from "~/stores";
import bear from "~/configs/bear";

const Highlighter = (dark) => {
  return {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={dark ? dracula : prism}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };
};

const Sidebar = ({ cur, setMidBar }) => {
  return (
    <div className="w-full h-full bg-gray-700 text-white overflow-y-scroll">
      <div className="h-12 pr-3 hstack space-x-3 justify-end">
        <span className="i-ic:baseline-cloud-off text-xl" />
        <span className="i-akar-icons:settings-vertical text-xl" />
      </div>
      <ul>
        {bear.map((item, index) => (
          <li
            key={`bear-sidebar-${item.id}`}
            className={`pl-6 h-8 hstack cursor-default ${
              cur === index ? "bg-red-500" : "bg-transparent"
            } ${cur === index ? "" : "hover:bg-gray-600"}`}
            onClick={() => setMidBar(item.md, index)}
          >
            <span className={item.icon} />
            <span className="ml-2">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Middlebar = ({ items, cur, setContent }) => {
  return (
    <div
      className="w-full h-full overflow-y-scroll border-r c-border-300"
      bg="gray-50 dark:gray-800"
    >
      <ul>
        {items.map((item, index) => (
          <li
            key={`bear-midbar-${item.id}`}
            className={`h-24 flex flex-col cursor-default border-l-2 ${
              cur === index
                ? "border-red-500 bg-white dark:bg-gray-900"
                : "border-transparent bg-transparent"
            } hover:(bg-white dark:bg-gray-900)`}
            onClick={() => setContent(item.id, item.file, index)}
          >
            <div className="h-8 mt-3 hstack flex-none">
              <div className="-mt-1 w-10 vstack flex-none c-text-500">
                <span className={item.icon} />
              </div>
              <span className="relative text-gray-900 dark:text-gray-100 flex-grow font-bold">
                {item.title}
                {item.link && (
                  <a
                    className="absolute top-1 right-4"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="i-ant-design:link-outlined c-text-500" />
                  </a>
                )}
              </span>
            </div>
            <div className="h-16 ml-10 pb-2 pr-1 text-sm c-text-500 border-b c-border-300">
              {item.excerpt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Content = ({ contentID, contentURL }) => {
  const [storeMd, setStoreMd] = useState({});
  const dark = useStore((state) => state.dark);

  return (
    <div className="markdown w-full h-full c-text-700 bg-gray-50 dark:bg-gray-800 overflow-scroll py-6">
      <div className="w-2/3 px-2 mx-auto">
        <h1>
          <span style={{ color: "red" }}> Aero</span>
          <span>Drive</span>
        </h1>
        <p>
          <b>AERODRIVE</b> – an innovative and cutting-edge solution that
          revolutionizes the way you store, access, and interact with your
          files, apps, and games. Puter is a privacy-first personal cloud
          computer designed to provide you with a seamless and secure
          experience, all within the confines of your own private space.
        </p>
        <p>
          Moreover, AeroDrive's versatility extends to its compatibility with
          various devices and operating systems. Whether you prefer Windows,
          macOS, Linux, or even mobile platforms, Puter ensures a consistent
          user experience across all your devices. Effortlessly switch from your
          desktop computer to your smartphone or tablet, and experience the same
          level of functionality and convenience. But AeroDrive is more than
          just a device or a service; it represents a paradigm shift in how we
          interact with our digital lives.
        </p>
        <p>
          Welcome to a world where your files, apps, and games find solace
          within the confines of your personal cloud computer – AERODRIVE.{" "}
        </p>
        <h2>Description of services</h2>
        <p>
          AeroDrive is a cloud operating system that allows its users (each, a
          “User” and collectively “Users”) to upload, store, process, and share
          data, files, personal information, messages, pictures, and other
          materials (collectively, your “User Data”). You can also search,
          preview, sort and personalize your User Data.
        </p>
        <h2>Your Account</h2>
        <p>
          You can access the Services by creating a permanent account (a
          "Permanent Account") by registering your email and creating a
          password. You may also access the Services without registering a
          Permanent Account by way of a temporary session (a "Temporary
          Session"). However, users accessing the Services by way of a Temporary
          Session will not have access to the full range of Services and their
          User Data is removed from the Platform after the Temporary Session is
          closed. In consideration of your use of the Services, you hereby agree
          to: (a) provide true, accurate, current and complete information about
          yourself as requested by any registration forms on the Service (the
          “Registration Data”); and (b) maintain and promptly update the
          Registration Data to keep it true, accurate, current and complete.
        </p>
        <h2> FeedBack</h2>
        <p>
          While we are continually working to develop and evaluate our own
          product ideas and features, we also pay attention to the interests,
          feedback, comments, and suggestions we receive from our user
          community. If you choose to contribute by sending us any ideas for our
          Services or other products (collectively, “Feedback”), then regardless
          of what your accompanying communication may say, in order to avoid any
          misunderstandings the following terms will apply to the Feedback.{" "}
        </p>
      </div>
    </div>
  );
};

const Bear = () => {
  const [state, setState] = useState({
    curSidebar: 0,
    curMidbar: 0,
    midbarList: bear[0].md,
    contentID: bear[0].md[0].id,
    contentURL: bear[0].md[0].file,
  });

  const setMidBar = (items, index) => {
    setState({
      curSidebar: index,
      curMidbar: 0,
      midbarList: items,
      contentID: items[0].id,
      contentURL: items[0].file,
    });
  };

  const setContent = (id, url, index) => {
    setState({
      ...state,
      curMidbar: index,
      contentID: id,
      contentURL: url,
    });
  };

  return (
    <div className="bear font-avenir flex w-full h-full">
      <div className="flex-none w-44">
        <Sidebar cur={state.curSidebar} setMidBar={setMidBar} />
      </div>
      <div className="flex-none w-60">
        <Middlebar
          items={state.midbarList}
          cur={state.curMidbar}
          setContent={setContent}
        />
      </div>
      <div className="flex-grow">
        <Content contentID={state.contentID} contentURL={state.contentURL} />
      </div>
    </div>
  );
};

export default Bear;
