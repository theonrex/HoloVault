import React from "react";
import styles from "./HomePage.module.css";
import ConnectWallet from "../SolWallet/ConnectWallet";
import { asseticon } from "@/public/images";
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
const features = [
  {
    title: "Real-Time Asset Tracking",
    description:
      "Monitor your Solana holdings with precision. Our real-time tracking ensures you always have the most current information at your fingertips.",
    icon: asseticon,
  },
  {
    title: "NFT Management",
    description:
      "Your NFTs deserve a special place. Solana Vault allows you to effortlessly manage, display, and enjoy your digital collectibles.",
    icon: asseticon,
  },
  {
    title: "Transaction History",
    description:
      "View a detailed record of all your transactions, including those involving NFTs. Our intuitive interface makes it easy to filter and analyze your portfolio's activity.",
    icon: asseticon,
  },
  {
    title: "Performance Analytics",
    description:
      "Your security is paramount. Solana Vault uses state-of-the-art encryption and authentication methods to protect your data, ensuring your assets are always safe.",
    icon: asseticon,
  },
];
const howItWorks = [
  {
    icon: asseticon,
    title: "Connect Your Wallet",
    description: "Quickly and securely connect your Solana wallet.",
  },
  {
    icon: asseticon,
    title: "Explore Your Portfolio",
    description:
      "Get a comprehensive view of your assets, including NFTs and transaction history.",
  },
  {
    icon: asseticon,
    title: "Optimize Your Investments",
    description:
      " Utilize our analytics tools to enhance your investment strategy.",
  },
];

const faqs = [
  {
    question: "How do I connect my Solana wallet?",
    answer:
      "Click on the 'Connect Wallet' button and select your preferred Solana wallet. Follow the simple instructions to connect.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We employ advanced encryption and secure authentication methods to ensure your data is protected.",
  },
  {
    question: "Can I track multiple wallets?",
    answer:
      "Yes, Solana Vault allows you to connect and manage multiple Solana wallets seamlessly.",
  },
  {
    question: "How can I view and manage my NFTs?",
    answer:
      "After connecting your wallet, navigate to the NFT section to view and manage all your digital collectibles.",
  },
];
export default function HomePage() {
  return (
    <div>
      {" "}
      <div className={styles.HomePage}>
        {" "}
        <header className={styles.welcome}> Welcome to Holo </header>{" "}
        <h1>
          {" "}
          Manage Your Digital Assets <br /> with Ease and Fun{" "}
        </h1>{" "}
        <p>
          {" "}
          Experience the future of crypto portfolio management with Solana
          Vault. Seamlessly track your Solana assets and NFTs, all in one place.{" "}
        </p>{" "}
        <ConnectWallet />{" "}
      </div>{" "}
      {/* Features */}{" "}
      <div className={styles.Features}>
        {" "}
        <h1>Features</h1>{" "}
        <p>
          {" "}
          Manage your Solana investments and NFTs effortlessly with our
          intuitive platform.{" "}
        </p>{" "}
        <section>
          {" "}
          {features.map((feature, index) => (
            <div key={index}>
              {" "}
              <Image
                src={feature.icon}
                alt={feature.title}
                width={300}
                height={300}
              />{" "}
              <h2>{feature.title}</h2> <p>{feature.description}</p>{" "}
            </div>
          ))}{" "}
        </section>{" "}
      </div>{" "}
      {/* How It Works */}{" "}
      <div className={styles.HowItWorks}>
        {" "}
        <h1>How It Works</h1>{" "}
        <section>
          {" "}
          {howItWorks.map((step, index) => (
            <div key={index}>
              {" "}
              <Image
                src={step.icon}
                alt={step.title}
                width={300}
                height={300}
              />{" "}
              <h2>{step.title}</h2> <p>{step.description}</p>{" "}
            </div>
          ))}{" "}
        </section>{" "}
      </div>{" "}
      {/* FAQs */}{" "}
      <div className={styles.FAQs}>
        {" "}
        <h1>FAQs</h1>{" "}
        <section>
          {faqs.map((faq, index) => (
            <div className={` w-full  px-4  ${styles.faqsMap}`} key={index}>
              <div
                className={`mx-auto w-full  divide-y divide-white/5 rounded-xl bg-white/5 ${styles.Disclosure}`}
              >
                <Disclosure as="div" className={`p-6 `} defaultOpen={false}>
                  <DisclosureButton className="group flex w-full items-center justify-between">
                    <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                      {faq.question}
                    </span>
                    <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                    {faq.answer}
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </div>
          ))}{" "}
        </section>{" "}
      </div>{" "}
    </div>
  );
}
