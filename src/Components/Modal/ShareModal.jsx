import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from "react-share";
import { Check, Copy } from "lucide-react";
import "./index.css";
const ShareModal = ({ open, setopen, product }) => {
  const shareUrl = `${window.location.origin}/Product/${product._id}`;
  const title = `${product.name} - ₹${product.price}`;
  const inputRef = useRef(null);
  const [Copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent>
        <DialogTitle className="text-center">
          <div className="text-2xl">
            Share this Product
            <div className="text-sm text-slate-500 mt-2">
              Send the link to your friends and get their opinion
            </div>
          </div>
        </DialogTitle>
        <div className="mt-6 mb-5">
          <label htmlFor="" className="font-semibold">
            Share your link
          </label>
          <fieldset className="link-container">
            <input
              ref={inputRef}
              type="text"
              className="grow"
              value={window.location.href}
              disabled
            />
            <button className="" onClick={handleCopy}>
              {Copied ? (
                <Check size={16} color="gray" />
              ) : (
                <Copy size={16} color="gray" />
              )}
            </button>
          </fieldset>
        </div>
        <label htmlFor="" className="font-semibold">
          Share To
        </label>
        <div className="flex justify-center gap-9 gap-5">
          <WhatsappShareButton url={shareUrl} title={title}>
            <div className="social-media-icon">
              <i
                className="fa-brands fa-whatsapp text-4xl"
                style={{ color: "#00a85a" }}
              ></i>
              <div className="">Whatsapp</div>
            </div>
          </WhatsappShareButton>

          <FacebookShareButton url={shareUrl} quote={title}>
            <div className="social-media-icon">
              <i
                class="fa-brands fa-facebook text-4xl"
                style={{ color: "#0c7eeb" }}
              ></i>
              <div className="">Facebook</div>
            </div>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={title}>
            <div className="social-media-icon">
              <i
                class="fa-brands fa-x-twitter text-4xl"
                style={{ color: "black" }}
              ></i>
              <div className="">Twitter</div>
            </div>
          </TwitterShareButton>

          <LinkedinShareButton
            url={shareUrl}
            title={product.name}
            summary={product.description}
          >
            <div className="social-media-icon">
              <i
                class="fa-brands fa-linkedin-in text-4xl"
                style={{ color: "#2766b1" }}
              ></i>
              <div className="">LinkedIn</div>
            </div>
          </LinkedinShareButton>

          <TelegramShareButton url={shareUrl} title={title}>
            <div className="social-media-icon">
              <i
                class="fa-brands fa-telegram text-4xl"
                style={{ color: "#2ea2db" }}
              ></i>
              <div className="">Telegram</div>
            </div>
          </TelegramShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
