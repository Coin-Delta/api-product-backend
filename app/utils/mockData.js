const { success } = require('./responseHelper')

// utils/mockData.js
const MOCK_RESPONSES = {
  aadhaar_validation: {
    success: {
      data: {
        data: {
          client_id: 'aadhaar_validation_DrkubmqOomYGMmWlvUmt',
          age_range: '20-30',
          aadhaar_number: '917646971298',
          state: 'Gujarat',
          gender: 'M',
          last_digits: '329',
          is_mobile: true,
          remarks: 'success',
          less_info: false
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'aadhaar_validation_bFlNHqzgHeGSfpOihIbz',
          age_range: null,
          aadhaar_number: '443205881234',
          state: null,
          gender: null,
          last_digits: null,
          is_mobile: null,
          remarks: 'invalid_aadhaar_format',
          less_info: false
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed !!!',
        message_code: 'verification_failed'
      }
    }
  },
  aadhaar_details_verify: {
    success: {
      data: {
        data: {
          address: {
            careOf: 'S/o devendra shah',
            country: 'India',
            district: 'Delhi',
            house: '504 Sarojni Nagar',
            landmark: 'Behind Government School',
            locality: '',
            pin: '450338',
            postOffice: 'Delhi G.P.O.',
            state: 'Delhi',
            street: '',
            subDistrict: '',
            vtc: 'Delhi'
          },
          dateOfBirth: '23-10-1993',
          email: '',
          gender: 'M',
          generatedAt: '1745841883110',
          maskedNumber: 'xxxx-xxxx-4228',
          name: 'Hitesh Shah',
          phone:
            'f49eac54e1e4f32db351f3a6dd949aa715196a1bb6e28c1461071ef3987ca3f3',
          photo:
            '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',
          document_pdf: null,
          aadhaar_linked_mobile_match: 'Yes'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'aadhaar_validation_bFlNHqzgHeGSfpOihIbz',
          age_range: null,
          aadhaar_number: '443205881234',
          state: null,
          gender: null,
          last_digits: null,
          is_mobile: null,
          remarks: 'invalid_aadhaar_format',
          less_info: false
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed !!!',
        message_code: 'verification_failed'
      }
    }
  },
  aadhaar_details_generate: {
    success: {
      data: {
        data: {
          referenceId: '44253547'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'aadhaar_validation_bFlNHqzgHeGSfpOihIbz',
          age_range: null,
          aadhaar_number: '443205881234',
          state: null,
          gender: null,
          last_digits: null,
          is_mobile: null,
          remarks: 'invalid_aadhaar_format',
          less_info: false
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed !!!',
        message_code: 'verification_failed'
      }
    }
  },
  din_verification: {
    success: {
      data: {
        data: {
          director_data: {
            din: '00000001',
            name: 'RATAN NAVAL TATA'
          },
          company_data: [
            {
              end_date: '-',
              designation: 'Director',
              company_name: 'RNT ASSOCIATES PRIVATE LIMITED',
              begin_date: '05/03/2009',
              'cin/fcrn': 'U74990MH2009PTC190764'
            },
            {
              end_date: '-',
              designation: 'Director',
              company_name: 'TATA FOUNDATION',
              begin_date: '21/02/2014',
              'cin/fcrn': 'U85191MH2014NPL253500'
            },
            {
              end_date: '-',
              designation: 'Director',
              company_name: 'RATAN TATA FOUNDATION',
              begin_date: '06/07/2017',
              'cin/fcrn': 'U74999MH2017NPL297009'
            },
            {
              end_date: '09/10/2024',
              designation: 'Nominee Director',
              company_name: 'ADVANCED VETERINARY CARE FOUNDATION',
              begin_date: '28/11/2022',
              'cin/fcrn': 'U85320MH2018NPL311761'
            },
            {
              end_date: '09/10/2024',
              designation: 'Director',
              company_name: 'ELECTRODRIVE POWERTRAIN SOLUTIONS PRIVATE LIMITED',
              begin_date: '30/09/2019',
              'cin/fcrn': 'U74999TZ2017PTC029256'
            },
            {
              end_date: '09/10/2024',
              designation: 'Director',
              company_name: 'AVANTI FINANCE PRIVATE LIMITED',
              begin_date: '01/08/2016',
              'cin/fcrn': 'U65929KA2016PTC138355'
            },
            {
              end_date: '26/03/2024',
              designation: 'Director',
              company_name: 'AVANTI MICROFINANCE PRIVATE LIMITED',
              begin_date: '07/10/2016',
              'cin/fcrn': 'U65929KA2016PTC138292'
            },
            {
              end_date: '23/03/2009',
              designation: 'Director',
              company_name: 'TATA TELESERVICES (MAHARASHTRA) LIMITED',
              begin_date: '11/08/2006',
              'cin/fcrn': 'L64200MH1995PLC086354'
            },
            {
              end_date: '28/12/2012',
              designation: 'Director',
              company_name: 'THE TATA POWER COMPANY LIMITED',
              begin_date: '18/05/1989',
              'cin/fcrn': 'L28920MH1919PLC000567'
            },
            {
              end_date: '22/02/2017',
              designation: 'Additional Director',
              company_name: 'TATA SONS PRIVATE LIMITED',
              begin_date: '24/10/2016',
              'cin/fcrn': 'U99999MH1917PTC000478'
            },
            {
              end_date: '22/02/2009',
              designation: 'Director',
              company_name: 'HINDUSTAN AERONAUTICS LIMITED',
              begin_date: '23/02/2006',
              'cin/fcrn': 'L35301KA1963GOI001622'
            },
            {
              end_date: '10/08/2006',
              designation: 'Director',
              company_name: 'TATA TELESERVICES (MAHARASHTRA) LIMITED',
              begin_date: '18/10/2005',
              'cin/fcrn': 'L64200MH1995PLC086354'
            },
            {
              end_date: '28/12/2012',
              designation: 'Director',
              company_name: 'THE INDIAN HOTELS COMPANY LIMITED',
              begin_date: '09/01/1984',
              'cin/fcrn': 'L74999MH1902PLC000183'
            },
            {
              end_date: '26/09/2008',
              designation: 'Director',
              company_name: 'TATA AUTOCOMP SYSTEMS LIMITED',
              begin_date: '29/05/1997',
              'cin/fcrn': 'U30204PN1995PLC158999'
            },
            {
              end_date: '28/12/2012',
              designation: 'Director',
              company_name: 'TATA INDUSTRIES LIMITED',
              begin_date: '06/09/1981',
              'cin/fcrn': 'U44003MH1945PLC004403'
            },
            {
              end_date: '28/12/2012',
              designation: 'Nominee Director',
              company_name: 'TATA TELESERVICES LIMITED',
              begin_date: '18/10/2005',
              'cin/fcrn': 'U74899DL1995PLC066685'
            },
            {
              end_date: '30/09/2019',
              designation: 'Additional Director',
              company_name: 'ELECTRODRIVE POWERTRAIN SOLUTIONS PRIVATE LIMITED',
              begin_date: '26/03/2019',
              'cin/fcrn': 'U74999TZ2017PTC029256'
            },
            {
              end_date: '07/06/2013',
              designation: 'Director',
              company_name: 'ANTRIX CORPORATION LIMITED',
              begin_date: '27/11/1992',
              'cin/fcrn': 'U85110KA1992GOI013570'
            },
            {
              end_date: '29/12/2012',
              designation: 'Director',
              company_name: 'TATA SONS PRIVATE LIMITED',
              begin_date: '21/08/1974',
              'cin/fcrn': 'U99999MH1917PTC000478'
            },
            {
              end_date: '28/12/2012',
              designation: 'Director',
              company_name: 'TATA STEEL LIMITED',
              begin_date: '17/08/1977',
              'cin/fcrn': 'L27100MH1907PLC000260'
            },
            {
              end_date: '28/12/2012',
              designation: 'Director',
              company_name: 'TATA CHEMICALS LIMITED',
              begin_date: '11/04/1983',
              'cin/fcrn': 'L24239MH1939PLC002893'
            },
            {
              end_date: '28/12/2012',
              designation: 'Director',
              company_name: 'TATA CONSULTANCY SERVICES LIMITED',
              begin_date: '05/05/2004',
              'cin/fcrn': 'L22210MH1995PLC084781'
            },
            {
              end_date: '07/02/2013',
              designation: 'Director',
              company_name:
                'THE BOMBAY DYEING AND MANUFACTURING COMPANY LIMITED',
              begin_date: '01/08/1979',
              'cin/fcrn': 'L17120MH1879PLC000037'
            },
            {
              end_date: '28/12/2012',
              designation: 'Director',
              company_name: 'TATA CONSUMER PRODUCTS LIMITED',
              begin_date: '18/01/1991',
              'cin/fcrn': 'L15491WB1962PLC031425'
            },
            {
              end_date: '28/12/2012',
              designation: 'Director',
              company_name: 'TATA MOTORS LIMITED',
              begin_date: '14/08/1981',
              'cin/fcrn': 'L28920MH1945PLC004520'
            }
          ],
          llp_data: [
            {
              end_date: '-',
              llp_name: 'AVANTI CAPITAL ADVISORS LLP',
              designation: 'Designated Partner',
              begin_date: '09/04/2017',
              'llpin/fllpin': 'AAJ-1011'
            },
            {
              end_date: '-',
              llp_name: 'RNT CAPITAL ADVISERS LLP',
              designation: 'Designated Partner',
              begin_date: '12/04/2016',
              'llpin/fllpin': 'AAG-1638'
            }
          ]
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: null,
        status_code: 422,
        success: false,
        message: 'Inactive ClientId',
        message_code: 'verification_failed'
      }
    }
  },
  fssai_verification: {
    success: {
      data: {
        data: {
          id_number: '21524010000507',
          application_number: '30240523116619907',
          fssai_number: '21524010000507',
          details: [
            {
              address_premises:
                'SHOP NO-F/37,1ST FLR,SEZ PLAZA BLOCK SECTOR MARVE ROAD MALAD WEST,  Marve Erangel, Greater Mumbai Ward-P/N, Greater Mumbai, Maharashtra, 400064',
              status_desc: 'Registration Certificate issued',
              district_name: 'Greater Mumbai',
              fbo_id: 599743778735406,
              display_ref_id: '30240523116619907',
              taluk_name: 'Greater Mumbai Ward-P/N',
              company_name: 'KRISHNAA  AGRO LLP',
              state_premises: 'MH',
              district_premises: 458,
              app_type_desc: 'New License/New Registration',
              taluk_premises: 4169,
              state_name: 'Maharashtra',
              license_category_name: 'Registration',
              app_type: 'N',
              app_submission_date: '2024-05-23',
              last_updated_on: '2024-06-01',
              pincode: 400064,
              ref_id: 116619907
            }
          ]
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: null,
        status_code: 422,
        success: false,
        message: 'Invalid Id',
        message_code: 'verification_failed'
      }
    }
  },
  gst_details_advance: {
    success: {
      data: {
        data: {
          contact_details: {
            principal: {
              address:
                'Belur Industrial Area, Works Office, Mummigatti Post, Pune Bangalore Road, Dharwad, Dharwad, Karnataka, 580011',
              email: 'gst.south@tatamotors.com',
              mobile: '9130094259',
              nature_of_business:
                'Factory / Manufacturing, Office / Sale Office, Recipient of Goods or Services, Service Provision, Wholesale Business, Retail Business'
            },
            additional: [
              {
                address:
                  'BELUR INDUSTRIAL AREA, TMML, GARAG ROAD, MUMMIGATTI POSTT DHARWAD, Dharwad, Karnataka, 580011',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business: 'Others'
              },
              {
                address:
                  'Kailash Vahan Udyog Limited Factory 21, Balagaranahalli Hosur main road, Attibele, Bengaluru Rural, Karnataka, 562107',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business: 'Others'
              },
              {
                address:
                  'Warehouse, Survey No 331 and A/332, Marsur Village, Kasab Hobli, Anekal Taluk, Bengaluru Urban, Karnataka, 560081',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business: 'Others'
              },
              {
                address:
                  'Plot No 317-P, 318-P, 319-P, Jigani-Bommasandra link Road, Jigani, Anekal Taluk, Bengaluru Urban, Karnataka, 562106',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business: 'Others'
              },
              {
                address:
                  'Vehicle Maintenance Department, VRL Complex, 16KM Bangalore Road, NH4, Hubballi, Warur, Dharwad, Karnataka, 581207',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business: 'Warehouse / Depot'
              },
              {
                address:
                  'Krishnapuram Jigani, Plot No 314 and 319, Tata Motors Ltd SPD CV, Anekal Taluk Jigani, Jigani-Bommasandra link Road, Sidlaghatta, Chikkaballapur, Karnataka, 562105',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business:
                  'Export, Recipient of Goods or Services, Warehouse / Depot, Office / Sale Office'
              },
              {
                address:
                  'Mummigatti Post, Regional Sales Office, NH 4, Tata Motors Manufacturing Plant Dharwad, Belur Industrial Area, Belur Industrial Area, Dharwad, Karnataka, 580011',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business:
                  'Bonded Warehouse, Recipient of Goods or Services, Warehouse / Depot, Office / Sale Office, Export'
              },
              {
                address:
                  'No 129/1B, IMAC India Coach Builders Pvt Ltd, Mysore Road, Kengeri, Bengaluru, Bengaluru Urban, Karnataka, 560060',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business:
                  'Others, Supplier of Services, Recipient of Goods or Services, Office / Sale Office'
              },
              {
                address:
                  '2 and 3 Floor, # 648, Regional Area Office, 1st Main Road. Sector 6 HSR Layout, Bengaluru, Bengaluru Urban, Karnataka, 560102',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business:
                  'Office / Sale Office, Supplier of Services, Recipient of Goods or Services'
              },
              {
                address:
                  '127, Tata Motors Limited -SATRAC ENGINEERING, SOMPURA INDUSTRIAL AREA, Nidavanda Village, Dobaspet Industrial Area, Bengaluru Rural, Karnataka, 562132',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business:
                  'Office / Sale Office, Others, Recipient of Goods or Services, Supplier of Services, Warehouse / Depot'
              },
              {
                address:
                  '1A, 1st Floor, Roopena Agrahara., Fortune Summit,Sector 6 , under BBMP Ward No.174., 290/281/276/243/244, Hosur Road, Bommanahalli, Bengaluru, Bengaluru Urban, Karnataka, 560068',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business:
                  'Bonded Warehouse, Retail Business, Supplier of Services, Recipient of Goods or Services, Warehouse / Depot, Office / Sale Office'
              },
              {
                address:
                  'Plot No. 176 C, SY No. 233 and 241, Anchemco India Pvt Ltd, Belur village, Dharwad Taluk, Garag Hobli, Belur Industrial Area, Dharwad, Dharwad, Karnataka, 580001',
                email: 'gst.south@tatamotors.com',
                mobile: '9130094259',
                nature_of_business:
                  'Bonded Warehouse, Warehouse / Depot, Office / Sale Office, Others, Export, Supplier of Services, Recipient of Goods or Services'
              }
            ]
          },
          promoters: ['Girish Arun Wagh ', 'Om Prakash Bhatt '],
          annual_turnover: 'Slab: Rs. 500 Cr. and above',
          annual_turnover_fy: '2023-2024',
          percentage_in_cash_fy: '2023-2024',
          percentage_in_cash: 'Slab: 2 to 5%',
          aadhaar_validation: 'Yes',
          aadhaar_validation_date: '2024-12-06',
          address_details: {},
          gstin: '29AAACT2727Q1ZS',
          pan_number: 'AAACT2727Q',
          business_name: 'TATA  MOTORS  LTD',
          legal_name: 'TATA MOTORS LIMITED',
          center_jurisdiction:
            'State - CBIC,Zone - BENGALURU,Commissionerate - BELAGAVI,Division - DHARWAR DIVISION,Range - DHARWAD-B RANGE (Jurisdictional Office)',
          state_jurisdiction:
            'State - Karnataka,Division - DGSTO Dharwad, LOCAL GST Office - LGSTO 310 - Dharwad',
          date_of_registration: '2017-07-01',
          constitution_of_business: 'Public Limited Company',
          taxpayer_type: 'Regular',
          gstin_status: 'Active',
          date_of_cancellation: '1800-01-01',
          field_visit_conducted: 'No',
          nature_bus_activities: [
            'Factory / Manufacturing',
            'Office / Sale Office',
            'Recipient of Goods or Services',
            'Service Provision',
            'Wholesale Business',
            'Retail Business',
            'Others',
            'Warehouse / Depot',
            'Export',
            'Bonded Warehouse',
            'Supplier of Services'
          ],
          nature_of_core_business_activity_code: 'MFT',
          nature_of_core_business_activity_description: 'Manufacturer',
          filing_status: [
            [
              {
                return_type: 'GSTR1',
                financial_year: '2024-2025',
                tax_period: 'December',
                date_of_filing: '2025-01-11',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR1',
                financial_year: '2024-2025',
                tax_period: 'November',
                date_of_filing: '2024-12-10',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR1',
                financial_year: '2024-2025',
                tax_period: 'October',
                date_of_filing: '2024-11-11',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR1',
                financial_year: '2024-2025',
                tax_period: 'September',
                date_of_filing: '2024-10-11',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR1',
                financial_year: '2024-2025',
                tax_period: 'August',
                date_of_filing: '2024-09-11',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR1',
                financial_year: '2024-2025',
                tax_period: 'July',
                date_of_filing: '2024-08-09',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR1',
                financial_year: '2024-2025',
                tax_period: 'June',
                date_of_filing: '2024-07-10',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR1',
                financial_year: '2024-2025',
                tax_period: 'May',
                date_of_filing: '2024-06-10',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR1',
                financial_year: '2024-2025',
                tax_period: 'April',
                date_of_filing: '2024-05-10',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR1',
                financial_year: '2023-2024',
                tax_period: 'March',
                date_of_filing: '2024-04-11',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2024-2025',
                tax_period: 'December',
                date_of_filing: '2025-01-22',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2024-2025',
                tax_period: 'November',
                date_of_filing: '2024-12-20',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2024-2025',
                tax_period: 'October',
                date_of_filing: '2024-11-20',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2024-2025',
                tax_period: 'September',
                date_of_filing: '2024-10-19',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2024-2025',
                tax_period: 'August',
                date_of_filing: '2024-09-20',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2024-2025',
                tax_period: 'July',
                date_of_filing: '2024-08-20',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2024-2025',
                tax_period: 'June',
                date_of_filing: '2024-07-20',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2024-2025',
                tax_period: 'May',
                date_of_filing: '2024-06-20',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2024-2025',
                tax_period: 'April',
                date_of_filing: '2024-05-20',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR3B',
                financial_year: '2023-2024',
                tax_period: 'March',
                date_of_filing: '2024-04-20',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9',
                financial_year: '2023-2024',
                tax_period: 'Annual',
                date_of_filing: '2024-12-26',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9',
                financial_year: '2022-2023',
                tax_period: 'Annual',
                date_of_filing: '2023-12-22',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9',
                financial_year: '2021-2022',
                tax_period: 'Annual',
                date_of_filing: '2022-12-19',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9',
                financial_year: '2020-2021',
                tax_period: 'Annual',
                date_of_filing: '2021-11-11',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9',
                financial_year: '2019-2020',
                tax_period: 'Annual',
                date_of_filing: '2021-02-24',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9',
                financial_year: '2018-2019',
                tax_period: 'Annual',
                date_of_filing: '2020-09-21',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9',
                financial_year: '2017-2018',
                tax_period: 'Annual',
                date_of_filing: '2019-09-26',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9C',
                financial_year: '2023-2024',
                tax_period: 'Annual',
                date_of_filing: '2024-12-26',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9C',
                financial_year: '2022-2023',
                tax_period: 'Annual',
                date_of_filing: '2023-12-23',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9C',
                financial_year: '2021-2022',
                tax_period: 'Annual',
                date_of_filing: '2022-12-21',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9C',
                financial_year: '2020-2021',
                tax_period: 'Annual',
                date_of_filing: '2021-11-11',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9C',
                financial_year: '2019-2020',
                tax_period: 'Annual',
                date_of_filing: '2021-02-25',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9C',
                financial_year: '2018-2019',
                tax_period: 'Annual',
                date_of_filing: '2020-09-24',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              },
              {
                return_type: 'GSTR9C',
                financial_year: '2017-2018',
                tax_period: 'Annual',
                date_of_filing: '2019-10-22',
                status: 'Filed',
                mode_of_filing: 'ONLINE'
              }
            ]
          ],
          address: null,
          hsn_info: {},
          filing_frequency: []
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: null,
        status_code: 422,
        success: false,
        message: 'Invalid GST Number',
        message_code: 'verification_failed'
      }
    }
  },
  driving_license: {
    success: {
      data: {
        data: {
          client_id: 'license_iDdklSZIkxXfDrhVupRZ',
          license_number: 'TS02620190003657',
          state: 'Uttar Pradesh',
          name: 'MUNNA BHAIYA',
          permanent_address: 'TRIPATHI HAVELI, MIRZAPUR, UTTAR PRADESH',
          permanent_zip: '',
          temporary_address: 'TRIPATHI HAVELI, MIRZAPUR, UTTAR PRADESH',
          temporary_zip: '',
          citizenship: '',
          ola_name: 'RTA MAHABUBABAD',
          ola_code: 'TS026',
          gender: 'M',
          father_or_husband_name: 'KALEEN BHAIYA',
          dob: '1998-06-15',
          doe: '2039-07-23',
          transport_doe: '1800-01-01',
          doi: '2019-07-24',
          transport_doi: '1800-01-01',
          profile_image: 'base64Image',
          has_image: true,
          blood_group: '',
          vehicle_classes: ['MCWG', 'LMV-NT'],
          less_info: false
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'license_tkrawxSTiBqADpYgphxj',
          license_number: 'MH03201400155',
          state: null,
          name: null,
          permanent_address: null,
          permanent_zip: null,
          temporary_address: null,
          temporary_zip: null,
          citizenship: null,
          ola_name: null,
          ola_code: null,
          gender: null,
          father_or_husband_name: null,
          dob: '1940-06-21',
          doe: null,
          transport_doe: null,
          doi: null,
          transport_doi: null,
          profile_image: null,
          has_image: false,
          blood_group: null,
          vehicle_classes: [],
          less_info: false,
          additional_check: [],
          initial_doi: null,
          current_status: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  },
  tan_verification: {
    success: {
      data: {
        data: {
          nameOrgn: 'AMAZON SELLER SERVICES PRIVATE LIMITED',
          addLine1: '26/1 8TH FLOOR',
          addLine2: 'BRIGADE GATEWAY',
          addLine3: 'DR.RAJKUMAR ROAD',
          addLine5: 'BANGALORE',
          stateCd: 15,
          pin: 560055,
          phoneNum: '9xxxxxxxx9',
          dtTanAllotment: 1293691500000,
          emailId1: 'RxxxxxxxxxxxxxxxxxM'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'license_tkrawxSTiBqADpYgphxj',
          license_number: 'MH03201400155',
          state: null,
          name: null,
          permanent_address: null,
          permanent_zip: null,
          temporary_address: null,
          temporary_zip: null,
          citizenship: null,
          ola_name: null,
          ola_code: null,
          gender: null,
          father_or_husband_name: null,
          dob: '1940-06-21',
          doe: null,
          transport_doe: null,
          doi: null,
          transport_doi: null,
          profile_image: null,
          has_image: false,
          blood_group: null,
          vehicle_classes: [],
          less_info: false,
          additional_check: [],
          initial_doi: null,
          current_status: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  },
  pan_advance_verification: {
    success: {
      data: {
        data: {
          pan_number: 'AAAPT0002F',
          full_name: 'RATAN NAVAL TATA',
          full_name_split: ['RATAN', 'NAVAL', 'TATA'],
          masked_aadhaar: 'XXXXXXXX8901',
          address: {
            line_1: 'HAKEKAI 169B- 171',
            line_2: 'LOWER COLABA ROAD',
            street_name: 'Mumbai',
            zip: '400005',
            city: 'Mumbai',
            state: 'MAHARASHTRA',
            country: 'INDIA',
            full: 'HAKEKAI 169B- 171 LOWER COLABA ROAD Mumbai Mumbai MAHARASHTRA 400005'
          },
          email: 'hd*****ra@tata.com',
          phone_number: '92XXXXXX26',
          gender: 'M',
          dob: '1937-12-28',
          aadhaar_linked: true,
          category: 'person'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: null,
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  },
  pan_udyam_msme_status: {
    success: {
      data: {
        data: {
          pan_number: 'AFVPG9986M',
          udyam_exists: true,
          migration_status: null,
          pan_details: {
            full_name: 'BHIVA GANGARAM GAWAS',
            full_name_split: ['BHIVA', 'GANGARAM', 'GAWAS'],
            masked_aadhaar: 'XXXXXXXX1712',
            gender: 'M',
            dob: '1965-08-15',
            aadhaar_linked: true,
            category: 'person',
            status: 'valid'
          }
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: null,
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  },
  employment_history_uan_advance: {
    success: {
      data: {
        data: {
          employment_history: [
            {
              name: 'Munna Bhbaiya',
              guardian_name: 'Kaleen Bhaiya',
              establishment_name: 'I PROCESS SERVICES (INDIA) PVT. LTD.',
              member_id: 'KDMAL004123654000313079',
              date_of_joining: '2021-03-15',
              date_of_exit: '2024-05-25',
              last_pf_submitted: '2022-06-14',
              wage_month: 'May-2022'
            },
            {
              name: 'Munna Bhbaiya',
              guardian_name: 'Kaleen Bhaiya',
              establishment_name: 'acme india pvt. ltd.',
              member_id: 'KDMAL004123654000313199',
              date_of_joining: '2018-03-15',
              date_of_exit: '2021-05-25',
              last_pf_submitted: '2021-06-14',
              wage_month: 'May-2021'
            }
          ]
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: null,
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  },
  rc_text: {
    success: {
      data: {
        data: {
          client_id: 'rc_dSpdBzqCodglkkoQkmeu',
          rc_number: 'AB12CD3456',
          registration_date: '2017-09-05',
          owner_name: 'Munna Bhaiya',
          father_name: 'Kaleen Bhaiya',
          present_address: 'HNO 1-10/2 Mirzapur',
          permanent_address: 'HNO 1-10/2 Mirzapur',
          mobile_number: '',
          vehicle_category: 'HPV',
          vehicle_chasi_number: 'ABCD12LRT0HH123456',
          vehicle_engine_number: 'ABCD12H123456',
          maker_description: 'VEHICLES LTD',
          maker_model: 'EICHER PRO BSIV',
          body_type: 'SALOON',
          fuel_type: 'DIESEL',
          color: 'WHITE',
          norms_type: 'BHARAT STAGE IV',
          fit_up_to: '2099-09-00',
          financer: 'FINANCE LTD',
          financed: true,
          insurance_company: 'Assurance Company Limited',
          insurance_policy_number: '0000023123456789',
          insurance_upto: '2099-00-04',
          manufacturing_date: '8/1947',
          manufacturing_date_formatted: '1947-08',
          registered_at: 'RTO',
          latest_by: '1497-00-27',
          less_info: true,
          tax_upto: null,
          tax_paid_upto: '1857-11-30',
          cubic_capacity: '3298',
          vehicle_gross_weight: '9850',
          no_cylinders: '4',
          seat_capacity: '50',
          sleeper_capacity: null,
          standing_capacity: null,
          wheelbase: '5260',
          unladen_weight: '6110',
          vehicle_category_description: 'Bus',
          pucc_number: '',
          pucc_upto: null,
          permit_number: '123/AB/45/64',
          permit_issue_date: null,
          permit_valid_from: null,
          permit_valid_upto: '2080-11-06',
          permit_type: 'TEMPORARY PERMIT',
          national_permit_number: null,
          national_permit_upto: null,
          national_permit_issued_by: null,
          non_use_status: null,
          non_use_from: null,
          non_use_to: null,
          blacklist_status: null,
          noc_details: null,
          owner_number: '1',
          rc_status: null,
          masked_name: false,
          challan_details: null,
          variant: null
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'rc_AxQofuGjQZhrvzhauaul',
          rc_number: 'KA12AC3456',
          registration_date: null,
          owner_name: null,
          father_name: null,
          present_address: null,
          permanent_address: null,
          mobile_number: null,
          vehicle_category: null,
          vehicle_chasi_number: null,
          vehicle_engine_number: null,
          maker_description: null,
          maker_model: null,
          body_type: null,
          fuel_type: null,
          color: null,
          norms_type: null,
          fit_up_to: null,
          financer: null,
          financed: null,
          insurance_company: null,
          insurance_policy_number: null,
          insurance_upto: null,
          manufacturing_date: null,
          manufacturing_date_formatted: null,
          registered_at: null,
          latest_by: null,
          less_info: false,
          tax_upto: null,
          tax_paid_upto: null,
          cubic_capacity: null,
          vehicle_gross_weight: null,
          no_cylinders: null,
          seat_capacity: null,
          sleeper_capacity: null,
          standing_capacity: null,
          wheelbase: null,
          unladen_weight: null,
          vehicle_category_description: null,
          pucc_number: null,
          pucc_upto: null,
          permit_number: null,
          permit_issue_date: null,
          permit_valid_from: null,
          permit_valid_upto: null,
          permit_type: null,
          national_permit_number: null,
          national_permit_upto: null,
          national_permit_issued_by: null,
          non_use_status: null,
          non_use_from: null,
          non_use_to: null,
          blacklist_status: null,
          noc_details: null,
          owner_number: null,
          rc_status: null,
          masked_name: false,
          challan_details: null,
          variant: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  },
  pan_comprehensive: {
    success: {
      data: {
        data: {
          client_id: 'pan_comprehensive_iEFYQybrNHIpKguuYQkd',
          pan_number: 'CQNPP8141A',
          full_name: 'JHON DOE',
          full_name_split: ['JHON', '', 'DOE'],
          masked_aadhaar: 'XXXXXXXX9337',
          address: {
            line_1: '',
            line_2: '',
            street_name: '',
            zip: '',
            city: '',
            state: '',
            country: '',
            full: ''
          },
          email: null,
          phone_number: null,
          gender: 'M',
          dob: '1994-12-01',
          input_dob: null,
          aadhaar_linked: true,
          dob_verified: false,
          dob_check: false,
          category: 'person',
          status: 'valid',
          less_info: false
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'pan_comprehensive_iEFYQybrNHIpKguuYQkd',
          pan_number: 'CQNPP8141A',
          full_name: null,
          full_name_split: null,
          masked_aadhaar: null,
          address: {
            line_1: '',
            line_2: '',
            street_name: '',
            zip: '',
            city: '',
            state: '',
            country: '',
            full: ''
          },
          email: null,
          phone_number: null,
          gender: null,
          dob: null,
          input_dob: null,
          aadhaar_linked: true,
          dob_verified: false,
          dob_check: false,
          category: 'person',
          status: 'invalid',
          less_info: false
        },
        status_code: 422,
        success: false,
        message: 'Invalid PAN',
        message_code: 'null'
      }
    }
  },
  pan_lite: {
    success: {
      data: {
        data: {
          client_id: 'pan_fAgJjMDrkcdPrfhbjxSM',
          pan_number: 'CQNPP4191A',
          full_name: 'JHON DOE',
          category: 'person'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'pan_fAgJjMDrkcdPrfhbjxSM',
          pan_number: 'CQNPP6191A',
          full_name: null,
          category: null
        },
        status_code: 422,
        success: false,
        message: 'Invalid PAN',
        message_code: null
      }
    }
  },
  voter_id: {
    success: {
      data: {
        data: {
          relation_type: 'F',
          gender: 'M',
          age: '32',
          epic_no: 'NLN2089125',
          client_id: 'bkpkzZyaaQ',
          dob: '1990-08-31',
          relation_name: 'KALEEN BHAIYA',
          name: 'MUNNA BHAIYA',
          area: 'Mirzapur',
          state: 'Uttar Pradesh',
          house_no: 'Tripathi Haveli'
        },
        status_code: 200,
        message: 'VoterId Fecthed successfully',
        success: true
      }
    },
    failure: {
      data: {
        data: {
          relation_type: null,
          gender: null,
          age: null,
          epic_no: 'NLN208912',
          client_id: null,
          dob: null,
          relation_name: null,
          name: null,
          area: null,
          state: null,
          house_no: null
        },
        status_code: 422,
        success: false,
        message: 'Invalid VoterId',
        message_code: null
      }
    }
  },
  bank_verification: {
    success: {
      data: {
        data: {
          client_id: 'bank_validation_pjTDReiGjNBputtmJIGC',
          account_exists: true,
          upi_id: null,
          full_name: 'A YADAV',
          remarks: '',
          ifsc_details: {
            id: 0,
            ifsc: 'CNRB0000000',
            micr: '123456789',
            iso3166: 'IN-UP',
            swift: null,
            bank: 'C Bank',
            bank_code: 'CNRB',
            bank_name: 'C Bank',
            branch: 'AGRA',
            centre: 'AGRA',
            district: 'AGRA',
            state: 'UTTAR PRADESH',
            city: 'AGRA',
            address: 'AAGRA (UP',
            contact: '+911234567890',
            imps: true,
            rtgs: true,
            neft: true,
            upi: true,
            micr_check: true
          }
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'bank_validation_GqyHCvJZSuRtogcjyoCi',
          account_exists: false,
          upi_id: null,
          full_name: null,
          remarks: '',
          ifsc_details: {}
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  bank_verification_pennyless: {
    success: {
      data: {
        data: {
          client_id: 'bank_validation_pjTDReiGjNBputtmJIGC',
          account_exists: true,
          upi_id: null,
          full_name: 'A YADAV',
          remarks: '',
          ifsc_details: {
            id: 0,
            ifsc: 'CNRB0000000',
            micr: '123456789',
            iso3166: 'IN-UP',
            swift: null,
            bank: 'C Bank',
            bank_code: 'CNRB',
            bank_name: 'C Bank',
            branch: 'AGRA',
            centre: 'AGRA',
            district: 'AGRA',
            state: 'UTTAR PRADESH',
            city: 'AGRA',
            address: 'AAGRA (UP',
            contact: '+911234567890',
            imps: true,
            rtgs: true,
            neft: true,
            upi: true,
            micr_check: true
          }
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'bank_pennyless_isWozyEnjGzhYsAhCZJD',
          account_exists: false,
          upi_id: null,
          full_name: null,
          remarks: '',
          ifsc_details: {}
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  corporate_cin: {
    success: {
      data: {
        data: {
          client_id: 'company_VxnpnqIgEtFTmTlDpucz',
          company_id: 'U65999MH1995PLC123456',
          company_type: 'Company',
          company_name: 'FINSERV LIMITED',
          details: {
            company_info: {
              cin: 'U65999MH1995PLC123456',
              roc_code: 'Mumbai',
              registration_number: '123456',
              company_category: 'Company limited by Shares',
              class_of_company: 'Public',
              company_sub_category: 'Non-govt company',
              authorized_capital: '1750000000',
              paid_up_capital: '1500000000',
              number_of_members: '0',
              date_of_incorporation: '1995-03-14',
              registered_address:
                'J.B. Nagar Metro Station, J.B. Nagar, Andheri (E) Mumbai Mumbai City MH 400059 IN',
              address_other_than_ro: '-',
              email_id: 'nikita.@FINSERV.com',
              listed_status: 'Unlisted',
              active_compliance: null,
              suspended_at_stock_exchange: '-',
              last_agm_date: '2023-09-06',
              last_bs_date: '2023-03-31',
              company_status: 'Active',
              status_under_cirp: null
            },
            directors: [
              {
                din_number: '123456',
                director_name: 'AMIT GOYAL',
                start_date: '2014-08-04',
                end_date: '1800-01-01',
                surrendered_din: null
              },
              {
                din_number: '456789',
                director_name: 'CHANDRASHEKHAR GURUSWAMY AIYAR',
                start_date: '2016-03-30',
                end_date: '1800-01-01',
                surrendered_din: null
              },
              {
                din_number: '987456',
                director_name: 'AMIT KHANDELWAL',
                start_date: '2014-08-04',
                end_date: '1800-01-01',
                surrendered_din: null
              },
              {
                din_number: '654321',
                director_name: 'AMITH AGARWAL',
                start_date: '2014-08-04',
                end_date: '1800-01-01',
                surrendered_din: null
              }
            ],
            charges: [
              {
                assets_under_charge: ' Book debts',
                charge_amount: '150000000',
                date_of_creation: '2015-10-20',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts',
                charge_amount: '140000000',
                date_of_creation: '2015-12-15',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts',
                charge_amount: '500000000',
                date_of_creation: '2015-11-04',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts',
                charge_amount: '50000000',
                date_of_creation: '2015-08-31',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts; Standard asset portfolio',
                charge_amount: '50000000',
                date_of_creation: '2016-08-30',
                date_of_modification: '1800-01-01',
                status: 'OPEN'
              },
              {
                assets_under_charge: ' Book debts',
                charge_amount: '100000000',
                date_of_creation: '2016-07-29',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge: ' Book debts; Loan Assets, Receivables',
                charge_amount: '250000000',
                date_of_creation: '2016-08-22',
                date_of_modification: '1800-01-01',
                status: 'OPEN'
              },
              {
                assets_under_charge: ' Book debts; Standard asset portfolio',
                charge_amount: '150000000',
                date_of_creation: '2016-08-30',
                date_of_modification: '1800-01-01',
                status: 'OPEN'
              },
              {
                assets_under_charge: ' Book debts; Receivables',
                charge_amount: '100000000',
                date_of_creation: '2016-09-28',
                date_of_modification: '1800-01-01',
                status: 'CLOSED'
              },
              {
                assets_under_charge:
                  ' Book debts; Receivables(Present & Future) /Corporate Guarantee',
                charge_amount: '250000000',
                date_of_creation: '2016-12-29',
                date_of_modification: '1800-01-01',
                status: 'OPEN'
              }
            ]
          }
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'company_NTrScxUiqrlAPfrgaWVm',
          company_id: 'U65999MH1995PLC123456',
          company_type: null,
          company_name: null,
          details: {}
        },
        status_code: 422,
        success: false,
        message: 'Invalid Company ID',
        message_code: null
      }
    }
  },
  generate_ccrv_request: {
    success: {
      data: {
        data: {
          code: '1016',
          message: 'CCRV search requested successfully.',
          transaction_id: '8602ce64-27ab-43df-b13f-990989479b84',
          ccrv_status: 'REQUESTED'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: null,
        status_code: 422,
        success: false,
        message: 'Internal Server Error',
        message_code: null
      }
    }
  },
  verify_ccrv_request: {
    success: {
      data: {
        data: {
          code: '1019',
          message: 'CCRV result fetched for an individual.',
          transaction_id: 'd1305ef5-34fc-4f8e-9f40-96cf893de3e5',
          ccrv_status: 'COMPLETED',
          ccrv_data: {
            case_count: 43,
            cases: [
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                case_category: 'criminal',
                case_number: '200100002972023',
                case_status: 'NOT HEARD CASES',
                case_year: '2023',
                cnr: 'MHMM160010272023',
                court_name:
                  'Additional Metropolitan Magistrate, Vikroli, Mumbai',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2023-02-07',
                firNumber: '10',
                fir_year: '2023',
                first_hearing_date: '2023-02-07',
                name: 'Siddharth Ashok Ahire',
                next_hearing_date: '2023-07-26',
                oparty: 'Pant Nagar Police Station',
                police_station: 'PANT NAGAR',
                registration_date: '2023-02-07',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Maharashtra Prevention of Gambling Act',
                under_sections: '12a,5'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                case_category: 'criminal',
                case_number: '203000000982024',
                case_status: 'Appearance',
                case_year: '2024',
                cnr: 'MHJG140008952024',
                court_name: 'Civil Cum Criminal Court, Dharangaon',
                district_name: 'Jalgaon',
                filing_date: '2024-08-29',
                firNumber: '241',
                fir_year: '2020',
                first_hearing_date: '2024-08-29',
                name: 'Siddharth Ashok Ahire',
                next_hearing_date: '2024-09-03',
                oparty: 'State of Maharashtra',
                police_station: 'Dharangaon Police Station',
                registration_date: '2024-08-29',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'INDIAN PENAL CODE',
                under_sections: '307,353,379,511,109,111,112,120b,34'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                case_category: 'criminal',
                case_number: '200200000982024',
                case_status: 'NOT HEARD CASES',
                case_year: '2024',
                cnr: 'MHMM160006562024',
                court_name:
                  'Additional Metropolitan Magistrate, Vikroli, Mumbai',
                district_name: 'Mumbai CMM Courts',
                filing_date: '18-01-2024',
                filing_number: '582/2024',
                firNumber: '813',
                fir_year: '2023',
                first_hearing_date: '18th January 2024',
                name: 'Siddharth Ashok Ahire',
                next_hearing_date: '20th September 2024',
                oparty: 'PANT NAGAR POLICE STATION',
                police_station: 'PANT NAGAR',
                registration_date: '18-01-2024',
                registration_number: '98/2024',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'INDIAN PENAL CODE',
                under_sections: '324,34'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address: '     - Ramabai colony,Ghatkopar  - east ,Mumbai',
                case_category: 'criminal',
                case_number: '200249001142009',
                case_status: 'Disposed',
                case_year: '2009',
                cnr: 'MHMM160000142009',
                court_name:
                  'Addl. Chief Metropolitan Magistrate, Vikroli, Mumb',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2009-01-28',
                firNumber: '231',
                fir_year: '2008',
                name: 'Siddharth Ashok Ahire',
                next_hearing_date: '2016-09-16',
                oparty: 'Gautam Shankarrao Vishwakarma',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: ' PART HEARD',
                registration_date: '2009-01-28',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'I P C',
                under_sections: '379,34'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address: 'Ramabai colony,Ghatkopar    east ,Mumbai',
                case_category: 'criminal',
                case_number: '200249001142009',
                case_year: '2009',
                court_name: '---',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2009-01-28',
                firNumber: '231',
                first_hearing_date: '0000-00-00',
                name: 'Siddharth Ashok Ahire',
                next_hearing_date: '2015-01-08',
                oparty: 'Gautam Shankarrao Vishwakarma',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: 'FOR HEARING',
                registration_date: '2009-01-28',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'I P C',
                under_sections: '379,34'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address:
                  '    ROOM NO. 607, BUILDING NO.5/A P.M.G.P, COLONY, MUMBAI - 17',
                case_category: 'criminal',
                case_number: '200107026202016',
                case_status: 'Pending',
                case_year: '2016',
                cnr: 'MHMM180025332016',
                court_name: 'Addl. C.M.M. Bandra Center of Courts Mumbai',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2016-06-07',
                firNumber: '58',
                fir_year: '2016',
                first_hearing_date: '2016-06-21',
                name: 'SIDDHARTH ASHOK AHIRE',
                next_hearing_date: '2016-06-21',
                oparty: 'DHARAVI   KISANRAO DHRMAJI NAWADKAR',
                police_station: 'Dharavi P.Stn.',
                purpose_of_hearing: ' NOT HEARD CASES',
                registration_date: '2016-06-07',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Indian Penal Code, Bombay Police Act',
                under_sections: '4,25, 135'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                case_category: 'criminal',
                case_number: '200100002972023',
                case_status: 'NOT HEARD CASES',
                case_year: '2023',
                cnr: 'MHMM160010272023',
                court_name:
                  'Additional Metropolitan Magistrate, Vikroli, Mumbai',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2023-02-07',
                firNumber: '10',
                fir_year: '2023',
                first_hearing_date: '2023-02-07',
                name: 'Siddharth Ashok Ahire',
                next_hearing_date: '2023-07-26',
                oparty: 'Pant Nagar Police Station',
                police_station: 'PANT NAGAR',
                registration_date: '2023-02-07',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Maharashtra Prevention of Gambling Act',
                under_sections: '12a,5'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                case_category: 'criminal',
                case_number: '203600009312020',
                case_year: '2020',
                cnr: 'MHJG040032472020',
                court_name: 'Jalgaon,District and Sessions Court',
                district_name: 'Jalgaon',
                filing_date: '2020-12-02',
                firNumber: ' 241',
                first_hearing_date: '2020-12-07',
                name: 'Siddharath Ashok Ahire',
                next_hearing_date: '2020-12-07',
                oparty: 'State of Maharashtra',
                police_station: 'Dharangaon Police Stn',
                purpose_of_hearing: ' Reply/Say',
                registration_date: '2020-12-03',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts:
                  'MINES AND MINERALS (DEVELOPMENT AND REGULATION) ACT',
                under_sections: '21,'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address:
                  '    Samrat Ashok Chawl Ramabai Colony Ghatkopar East Mumbai',
                case_category: 'criminal',
                case_number: '200273009192015',
                case_status: 'Pending',
                case_year: '2015',
                cnr: 'MHMM160052582015',
                court_name:
                  'Addl. Chief Metropolitan Magistrate, Vikroli, Mumb',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2015-11-18',
                firNumber: '132',
                fir_year: '2015',
                first_hearing_date: '2015-11-18',
                name: 'Siddharath Ashok Ahire',
                next_hearing_date: '2016-10-04',
                oparty: 'Vikas Harichandra Hivale',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: ' NOT HEARD CASES',
                registration_date: '2015-11-18',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'I P C',
                under_sections: '324,323,34'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address: '    41307,Ramabai Nagar Ghatkopar east,Mumbai',
                case_category: 'criminal',
                case_number: '200249004612009',
                case_type: 'criminal',
                case_year: '2009',
                cnr: 'MHMM160018422009',
                court_name:
                  'Addl. Chief Metropolitan Magistrate, Vikroli, Mumb',
                district_name: 'Mumbai CMM Courts',
                filing_year: '2009',
                firNumber: '29             ',
                name: 'Sioddharth  Ashok Ahire',
                next_hearing_date: '2016-10-06',
                oparty: 'Dyanial Vaman Balit',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: ' PART HEARD',
                registration_year: '2009',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'I P C',
                under_sections: '380,34',
                year: '2009'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address:
                  '    Chawl No 41 R NO 276 Ambekdar Nagar Ghatkopar Eat Mumbai',
                case_category: 'criminal',
                case_number: '200273006462015',
                case_status: 'Pending',
                case_year: '2015',
                cnr: 'MHMM160032572015',
                court_name:
                  'Addl. Chief Metropolitan Magistrate, Vikroli, Mumb',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2015-08-05',
                firNumber: '222',
                fir_year: '2015',
                first_hearing_date: '2015-08-05',
                name: 'Siddharath Ashok Ahire',
                next_hearing_date: '2017-03-07',
                oparty: 'Rajesh Baburao Netavate',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: ' NOT HEARD CASES',
                registration_date: '2015-08-05',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'I P C',
                under_sections: '394,34'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address: '41/307,Ramabai Nagar Ghatkopar (east),Mumbai',
                case_category: 'criminal',
                case_number: '200249004612009',
                case_year: '2009',
                court_name: '---',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2009-06-11',
                firNumber: '29',
                first_hearing_date: '0000-00-00',
                name: 'Sioddharth  Ashok Ahire',
                next_hearing_date: '2015-01-23',
                oparty: 'Dyanial Vaman Balit',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: 'FOR HEARING',
                registration_date: '2009-06-11',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'I P C',
                under_sections: '380,34'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                case_category: 'criminal',
                case_number: '209700002512022',
                case_status: 'Order',
                case_year: '2022',
                cnr: 'MHNS030041332022',
                court_name: 'Chief Judicial Magistrate , Nashik',
                district_name: 'Nashik',
                filing_date: '2022-05-25',
                fir_year: '0',
                first_hearing_date: '2022-06-08',
                name: 'Sidharth Ashok Ahire',
                next_hearing_date: '2022-07-18',
                oparty:
                  'Jyoti Sachin Ahire / Jyoti Madan Khairnar , Aayush Sachin Ahire , Aarohi Sachin Ahire',
                police_station: 'INDIRANAGAR POLICE STATION',
                registration_date: '2022-05-25',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Protection of Women from Domestic Violence Act',
                under_sections: '12,18,19,20,22'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address:
                  '     - Chawl No 41 R No 376 Panchashil Chouk Ramabai Ambedkar Nagar Ghatkopar East Mumbai',
                case_category: 'criminal',
                case_number: '200100003912017',
                case_status: 'Pending',
                case_type: 'PS - Police Summons',
                case_year: '2017',
                cnr: 'MHMM160021272017',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2017-06-13',
                filing_number: '2118/2017',
                filing_year: '2017',
                firNumber: '22',
                fir_year: '2017',
                first_hearing_date: '2017-06-13',
                name: 'Sidharath Ashok Ahire',
                next_hearing_date: '2017-11-22',
                oparty: 'Pant Nagar Police Station',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: ' NOT HEARD CASES',
                registration_date: '2017-06-13',
                registration_number: '391/2017',
                registration_year: '2017',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'N.D.P.S. Act',
                under_sections: '8,c,27',
                year: '2017'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address:
                  '     - Ramabai Ambedkar Nagar Panchashil Chouk Chawl No 41 R No 376 Ghatkopar Mumbai',
                case_category: 'criminal',
                case_number: '200173015772015',
                case_status: 'Pending',
                case_year: '2015',
                cnr: 'MHMM160045612015',
                court_name:
                  'Addl. Chief Metropolitan Magistrate, Vikroli, Mumb',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2015-09-29',
                firNumber: '186',
                fir_year: '2015',
                first_hearing_date: '2016-01-16',
                name: 'Sidharath Ashok Ahire',
                next_hearing_date: '2017-08-13',
                oparty: 'Kailas Ashok Babare',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: ' NOT HEARD CASES',
                registration_date: '2015-09-29',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'B P Act',
                under_sections: '37i,135'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  '     - Chawl No.41-276,Ramabai Ambedkar Nagar Vasantrao Naik Road, Ghatkopar  - W Mumbai',
                case_category: 'criminal',
                case_number: '200249007612010',
                case_status: 'Pending',
                case_year: '2010',
                cnr: 'MHMM160115792010',
                court_name:
                  'Addl. Chief Metropolitan Magistrate, Vikroli, Mumb',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2010-09-30',
                firNumber: '212',
                fir_year: '2010',
                first_hearing_date: '2011-04-25',
                name: 'Siddharth   Siddhu Ashok Ahire',
                next_hearing_date: '2016-10-05',
                oparty: 'Muskib Khalid Thakur   PN Pstn',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: ' FOR HEARING',
                registration_date: '2010-09-29',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'I P C',
                under_sections: '143,144,147,148,149,324,506'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  'Add.Chawl No.41, R.No.376, Ramabai Ambedkar Nagar, Ghatkopar(E), Mumbai:75',
                case_category: 'criminal',
                case_number: '203601015952021',
                case_year: '2021',
                cnr: 'MHCC020076182021',
                court_name: 'City Sessions Court, Mumbai',
                district_name: 'Mumbai City Civil Court',
                filing_date: '2021-06-21',
                firNumber: ' 437',
                first_hearing_date: '2021-06-23',
                name: 'Siddharth   Sidhaya Ashok Ahire and Others   Applicants',
                next_hearing_date: '2021-07-08',
                oparty: 'State Pantnagar Police Station Respondent',
                police_station: 'Pant Nagar',
                purpose_of_hearing: ' HEARING',
                registration_date: '2021-06-21',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'INDIAN PENAL CODE',
                under_sections: '397,506 (II)'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                case_category: 'criminal',
                case_decision_date: ' 22nd November 2013',
                case_number: '200149004662012',
                case_status: ' CASE DISPOSED',
                case_type: ' Police Summons PS',
                case_year: '2012',
                cnr: 'MHMM160031392012',
                court_name:
                  'Additional Metropolitan Magistrate, Vikroli, Mumbai',
                decision_date: ' 22nd November 2013',
                district_name: 'Mumbai CMM Courts',
                filing_date: '12-09-2012',
                filing_number: '1000466/2012',
                filing_year: ' 2012',
                firNumber: ' 19',
                first_hearing_date: ' 02nd April 2013',
                name: 'Siddharth   Siddhu Ashok Ahire',
                nature_of_disposal: ' Uncontested--PROCEEDING STOPPED',
                oparty: 'Santosh Rama Gaikwad  PN',
                police_station: ' PANT NAGAR',
                registration_date: '12-09-2012',
                registration_number: '4900466/2012',
                registration_year: ' 2012',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'B P Act',
                under_sections: '142',
                year: ' 2012'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                case_category: 'criminal',
                case_number: '201501010532021',
                case_status: 'APPEARANCE',
                case_year: '2021',
                cnr: 'MHCC020153422021',
                court_name: 'City Sessions Court, Mumbai',
                district_name: 'Mumbai City Civil Court',
                filing_date: '2021-10-13',
                firNumber: '437',
                fir_year: '2021',
                first_hearing_date: '2021-12-21',
                name: 'Siddharth @ Sidhaya Ashok Ahire',
                next_hearing_date: '2022-04-12',
                oparty: 'The State of Maharashtra - Pantnagar Police Station',
                police_station: 'Pant Nagar',
                registration_date: '2021-12-09',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'INDIAN PENAL CODE,Maharashtra Police Act',
                under_sections: '397,506(2),34,37(1)(a),135'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  '41 276, Panchshil Chowk Ramabai Ambedkar Chowk Ghatkopar    E  Mumbai',
                case_category: 'criminal',
                case_decision_date: '24-12-2012',
                case_number: '200149024832011',
                case_status: 'CASE DISPOSED',
                case_year: '2011',
                court_name: '---',
                decision_date: '24-12-2012',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2011-12-14',
                firNumber: '28',
                first_hearing_date: '2012-10-10',
                name: 'Siddharth   Siddhu Ashok Ahire',
                nature_of_disposal: 'Uncontested--U/s 258 Cr.P.C.',
                oparty: 'Smiull Nazir Bhaldar   PN  Pstn',
                police_station: 'PANT NAGAR',
                registration_date: '2011-12-14',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'B P Act',
                under_sections: '142'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  'Chawl No.41 276,Ramabai Ambedkar Nagar Vasantrao Naik Road, Ghatkopar    W Mumbai',
                case_category: 'criminal',
                case_number: '200249007612010',
                case_year: '2010',
                court_name: '---',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2010-09-30',
                firNumber: '212',
                first_hearing_date: '2011-04-25',
                name: 'Siddharth   Siddhu Ashok Ahire',
                next_hearing_date: '2015-02-11',
                oparty: 'Muskib Khalid Thakur   PN Pstn',
                police_station: 'PANT NAGAR',
                purpose_of_hearing: 'FOR HEARING',
                registration_date: '2010-09-29',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'I P C',
                under_sections: '143,144,147,148,149,324,506'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  '41 376 Panchshil Chowk Ramabai ngar Ghatkopar east  Mumbai',
                case_category: 'criminal',
                case_decision_date: '22-11-2013',
                case_number: '200149004662012',
                case_status: 'CASE DISPOSED',
                case_year: '2012',
                court_name: '---',
                decision_date: '22-11-2013',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2012-09-12',
                firNumber: '19',
                first_hearing_date: '2013-04-02',
                name: 'Siddharth   Siddhu Ashok Ahire',
                nature_of_disposal: 'Uncontested--U/s 258 Cr.P.C.',
                oparty: 'Santosh Rama Gaikwad  PN',
                police_station: 'PANT NAGAR',
                registration_date: '2012-09-12',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'B P Act',
                under_sections: '142'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                case_category: 'criminal',
                case_decision_date: ' 24th December 2012',
                case_number: '200149024832011',
                case_status: ' CASE DISPOSED',
                case_type: ' Police Summons PS',
                case_year: '2011',
                cnr: 'MHMM160082992011',
                decision_date: ' 24th December 2012',
                district_name: 'Mumbai CMM Courts',
                filing_date: '14-12-2011',
                filing_number: '1002483/2011',
                filing_year: ' 2011',
                firNumber: ' 28',
                first_hearing_date: ' 10th October 2012',
                name: 'Siddharth   Siddhu Ashok Ahire',
                nature_of_disposal: ' Uncontested--PROCEEDING STOPPED',
                oparty: 'Smiull Nazir Bhaldar   PN  Pstn',
                police_station: ' PANT NAGAR',
                registration_date: '14-12-2011',
                registration_number: '4902483/2011',
                registration_year: ' 2011',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'B P Act',
                under_sections: '142',
                year: ' 2011'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                case_category: 'criminal',
                case_number: '200300000832023',
                case_status: 'First Order',
                case_year: '2023',
                cnr: 'MHTH070004302023',
                court_name: 'Civil Court Senior Divison , Kalyan',
                district_name: 'Thane',
                filing_date: '2023-01-23',
                first_hearing_date: '2023-01-30',
                name: 'Ashok S Ahire',
                next_hearing_date: '2023-04-28',
                oparty: 'Indumati Yashwant Pandit',
                registration_date: '2023-01-23',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Bombay Regulation Act,1827',
                under_sections: '8'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                case_category: 'civil',
                case_decision_date: '27th March 2014',
                case_number: '203526007332013',
                case_status: 'CASE DISPOSED',
                case_year: '2013',
                cnr: 'MHCO150007242013',
                court_name: 'Co-operative Court, Nashik',
                decision_date: '27th March 2014',
                district_name: 'Mah State Cooperative Appellat',
                filing_date: '2013-09-19',
                first_hearing_date: '2013-11-16',
                name: 'Ashok S. Ahire',
                nature_of_disposal: 'Contested--JUDGMENT',
                oparty: 'Janlaxmi Bank',
                registration_date: '2013-09-19',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                case_category: 'criminal',
                case_number: '200300000832023',
                case_status: 'First Order',
                case_year: '2023',
                cnr: 'MHTH070004302023',
                court_name: 'Civil Court Senior Divison , Kalyan',
                district_name: 'Thane',
                filing_date: '2023-01-23',
                first_hearing_date: '2023-01-30',
                name: 'Ashok S Ahire',
                next_hearing_date: '2023-04-28',
                oparty: 'Indumati Yashwant Pandit',
                registration_date: '2023-01-23',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Bombay Regulation Act,1827',
                under_sections: '8'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'EXACT_FUZZY',
                address: '     - Nashik',
                case_category: 'civil',
                case_decision_date: '27th March 2014',
                case_number: '203526007332013',
                case_status: 'CASE DISPOSED',
                case_year: '2013',
                cnr: 'MHCO150007242013',
                court_name: 'Co-operative Court, Nashik',
                decision_date: '27th March 2014',
                district_name: 'Mah State Cooperative Appellat',
                filing_date: '2013-09-19',
                first_hearing_date: '2013-11-16',
                name: 'Ashok S  Ahire',
                nature_of_disposal: 'Contested--JUDGMENT',
                oparty: 'Janlaxmi Bank',
                registration_date: '2013-09-19',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  '     - Chal No.61, R.No.431, Shivaji Nagar, Pokhren Road No.1, Thane',
                case_category: 'criminal',
                case_decision_date: '18th July 2012',
                case_number: '201501003612010',
                case_status: 'CASE DISPOSED',
                case_year: '2010',
                cnr: 'MHAU010052272010',
                court_name: 'District  and Sessions Court, Aurangabad',
                decision_date: '18th July 2012',
                district_name: 'Aurangabad',
                filing_date: '2010-11-12',
                firNumber: '49',
                fir_year: '2010',
                first_hearing_date: '2010-11-12',
                name: 'Usha Siddharth Ahire',
                nature_of_disposal: 'Uncontested--BY TRANSFER',
                oparty: 'The State of Maharashtra',
                police_station: 'PISHOR',
                registration_date: '2010-11-12',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Indian Penal Code',
                under_sections: '302,120B,201,34'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  'Chal No.61, R.No.431, Shivaji Nagar, Pokhren Road No.1, Thane',
                case_category: 'criminal',
                case_decision_date: '18-07-2012',
                case_number: '201501003612010',
                case_status: 'CASE DISPOSED',
                case_year: '2010',
                court_name: 'Civil Judge J.D.  J.M.F.C. Vaijapur',
                decision_date: '18-07-2012',
                district_name: 'Aurangabad',
                filing_date: '2010-11-12',
                firNumber: '49',
                first_hearing_date: '2010-11-12',
                name: 'Usha Siddharth Ahire',
                nature_of_disposal: 'Uncontested--BY TRANSFER',
                oparty: 'The State of Maharashtra',
                police_station: 'PISHOR',
                registration_date: '2010-11-12',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Indian Penal Code',
                under_sections: '302,120B,201,34'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  '      - Rat 61431 Pokhran Road, no. 1, Sivai Nagar, Thane West 606',
                case_category: 'civil',
                case_number: '239251000142015',
                case_status: 'Disposed',
                case_year: '2015',
                cnr: 'MHLC010017412015',
                court_name: 'Labour, Mumbai',
                district_name: 'Maharashtra Industrial and Lab',
                filing_date: '2015-11-30',
                first_hearing_date: '2015-11-30',
                name: 'Smt  Usha Siddharth Ahire',
                next_hearing_date: '2016-11-04',
                oparty: 'Mandakini Siddharth Ahire and ors',
                purpose_of_hearing: ' Report',
                registration_date: '2015-11-30',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 0,
                under_acts: 'Payment of Gratuity Act, 1972.',
                under_sections: '4'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  '     - Chal No.61, R.No.431, Shivaji Nagar, Pokhren Road No.1, Thane',
                case_category: 'criminal',
                case_decision_date: '25th March 2014',
                case_number: '201516000782012',
                case_status: 'CASE DISPOSED',
                case_year: '2012',
                cnr: 'MHAU040004492012',
                court_name: 'District and Additional Sessions Court, Vaijapur',
                decision_date: '25th March 2014',
                district_name: 'Aurangabad',
                filing_date: '2012-07-18',
                firNumber: '49',
                fir_year: '2010',
                first_hearing_date: '2012-07-30',
                name: 'Usha Siddharth Ahire',
                nature_of_disposal: 'Contested--JUDGMENT',
                oparty: 'The State of Maharashtra',
                police_station: 'PISHOR',
                registration_date: '2012-07-18',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Indian Penal Code',
                under_sections: '302,120B,201,34'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  'Chal No.61, R.No.431, Shivaji Nagar, Pokhren Road No.1, Thane',
                case_category: 'criminal',
                case_decision_date: '25-03-2014',
                case_number: '201516000782012',
                case_status: 'CASE DISPOSED',
                case_year: '2012',
                court_name: 'Civil Judge J.D.  J.M.F.C. Vaijapur',
                decision_date: '25-03-2014',
                district_name: 'Aurangabad',
                filing_date: '2012-07-18',
                firNumber: '49',
                first_hearing_date: '2012-07-30',
                name: 'Usha Siddharth Ahire',
                nature_of_disposal: 'Contested--JUDGMENT',
                oparty: 'The State of Maharashtra',
                police_station: 'PISHOR',
                registration_date: '2012-07-18',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Indian Penal Code',
                under_sections: '302,120B,201,34'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                case_category: 'criminal',
                case_number: '201900029782019',
                case_status: 'Disposed',
                case_year: '2019',
                cnr: 'MHTH030116652019',
                court_name: 'Thane, District and Sessions Court',
                district_name: 'Thane',
                filing_date: '2019-12-04',
                filing_number: '12355/2019',
                first_hearing_date: '2019-12-11',
                name: 'Siddharth Ashok Gijare',
                next_hearing_date: '2019-12-11',
                oparty: 'State of Maharashtra',
                purpose_of_hearing: ' Filing of Say on Exh___Unready',
                registration_date: '2019-12-06',
                registration_number: '2978/2019',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 0,
                under_acts: 'CODE OF CRIMINAL PROCEDURE',
                under_sections: '457'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                case_category: 'criminal',
                case_decision_date: ' 07th November 2015',
                case_number: '200138002982012',
                case_status: ' CASE DISPOSED',
                case_year: '2012',
                cnr: 'MHMM200014482012',
                court_name:
                  'Additional Metropolitan Magistrate, Ballardpier, Mumbai',
                decision_date: ' 07th November 2015',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2012-11-20',
                filing_number: '500298/2012',
                firNumber: ' 78',
                first_hearing_date: '2013-01-23',
                name: 'Siddharth Ashok  Gaure',
                nature_of_disposal: ' Contested--Acquitted',
                oparty: 'State Excise FS I',
                police_station: 'STATE EXCISE CITY 1',
                registration_date: '2012-11-20',
                registration_number: '3800298/2012',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'BOMBAY PROH. ACT 1949',
                under_sections: '65-E'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                case_category: 'criminal',
                case_number: '201501010532021',
                case_status: 'APPEARANCE',
                case_year: '2021',
                cnr: 'MHCC020153422021',
                court_name: 'City Sessions Court, Mumbai',
                district_name: 'Mumbai City Civil Court',
                filing_date: '2021-10-13',
                firNumber: '437',
                fir_year: '2021',
                first_hearing_date: '2021-12-21',
                name: 'sidhaya ashok ahire',
                next_hearing_date: '2022-04-12',
                oparty: 'The State of Maharashtra - Pantnagar Police Station',
                police_station: 'Pant Nagar',
                registration_date: '2021-12-09',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'INDIAN PENAL CODE,Maharashtra Police Act',
                under_sections: '397,506(2),34,37(1)(a),135'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  '      - Room No.431, Shivainagar, Pokharan Road No.1 Dist.Thane',
                case_category: 'criminal',
                case_decision_date: '03rd December 2010',
                case_number: '203601016242010',
                case_status: 'CASE DISPOSED',
                case_year: '2010',
                cnr: 'MHAU010054392010',
                court_name: 'District  and Sessions Court, Aurangabad',
                decision_date: '03rd December 2010',
                district_name: 'Aurangabad',
                filing_date: '2010-11-23',
                firNumber: '49',
                fir_year: '2010',
                first_hearing_date: '2010-11-23',
                name: 'Usha Shiddharth Ahire',
                nature_of_disposal: 'Contested--JUDGMENT',
                oparty: 'The State of Maharashtra',
                police_station: 'SHIVOOR',
                registration_date: '2010-11-23',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 0,
                under_acts: 'Indian Penal Code, Criminal Procedure Code',
                under_sections: '302,120B,201,34, 439'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  'Room No.431, Shivainagar, Pokharan Road No.1 Dist.Thane',
                case_category: 'criminal',
                case_decision_date: '03-12-2010',
                case_number: '203601016242010',
                case_status: 'CASE DISPOSED',
                case_year: '2010',
                court_name: '---',
                decision_date: '03-12-2010',
                district_name: 'Aurangabad',
                filing_date: '2010-11-23',
                firNumber: '49',
                first_hearing_date: '2010-11-23',
                name: 'Usha Shiddharth Ahire',
                nature_of_disposal: 'Contested--JUDGMENT',
                oparty: 'The State of Maharashtra',
                police_station: 'SHIVOOR',
                registration_date: '2010-11-23',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Indian Penal CodeCriminal Procedure Code',
                under_sections: '302,120B,201,34439'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address:
                  'TRANSIT CAMP, CHAWL NO. 27, RM NO. 174, RAMABAI AMBEDKAR NAGAR, GHATKOPAR E MUMBAI.',
                case_category: 'criminal',
                case_decision_date: '02-02-2011',
                case_number: '202048004662009',
                case_status: 'CASE DISPOSED',
                case_year: '2009',
                court_name: '---',
                decision_date: '02-02-2011',
                district_name: 'Mumbai',
                filing_date: '2010-04-22',
                first_hearing_date: '2010-04-22',
                name: 'AMOL ASHOK RUPWATE  amp  SIDDHARTH AHIRE',
                nature_of_disposal: '--JUDGMENT',
                oparty: 'PANTNAGAR PSTN',
                registration_date: '2008-04-28',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'INDIAN PENAL CODE',
                under_sections: '366(A), 376, 34'
              },
              {
                algorithm_risk: 'high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                case_category: 'criminal',
                case_number: '200200000382020',
                case_status: 'Pending',
                case_type: ' Police Warrant PW',
                case_year: '2020',
                cnr: 'MHMM160001512020',
                court_name:
                  'Additional Metropolitan Magistrate, Vikroli, Mumbai',
                district_name: 'Mumbai CMM Courts',
                filing_date: '06-01-2020',
                filing_number: '132/2020',
                filing_year: ' 2017',
                firNumber: ' 117',
                first_hearing_date: ' 07th August 2020',
                name: 'Siddhrath Ashok Ahire',
                next_hearing_date: ' 07th August 2020',
                oparty: 'Pant Nagar Police Station',
                police_station: ' PANT NAGAR',
                purpose_of_hearing: ' NOT HEARD CASES',
                registration_date: '06-01-2020',
                registration_number: '38/2020',
                registration_year: ' 2017',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'I P C',
                under_sections: '392',
                year: ' 2017'
              },
              {
                algorithm_risk: 'very high risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                case_category: 'criminal',
                case_decision_date: '08th October 2021',
                case_number: '200200011712021',
                case_status: 'Case disposed',
                case_year: '2021',
                cnr: 'MHMM160084872021',
                court_name:
                  'Additional Metropolitan Magistrate, Vikroli, Mumbai',
                decision_date: '08th October 2021',
                district_name: 'Mumbai CMM Courts',
                filing_date: '2021-10-08',
                firNumber: '437',
                fir_year: '2021',
                first_hearing_date: '2021-10-08',
                name: 'Siddhrath Ashok Ahire',
                nature_of_disposal: 'Uncontested--COMMITTED TO SESSIONS COURT',
                oparty: 'Pant Nagar Police Station',
                police_station: 'PANT NAGAR',
                registration_date: '2021-10-08',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'INDIAN PENAL CODE,Maharashtra Police Act',
                under_sections: '397,506II,34,37ia,135'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address: 'WadkhalTal.PenDist.Raigad',
                case_category: 'civil',
                case_decision_date: '10-02-2011',
                case_number: '200101000282007',
                case_status: 'CASE DISPOSED',
                case_year: '2007',
                cnr: 'MHRG010006882007',
                court_name: 'Jt. CJJD PEN',
                decision_date: '10-02-2011',
                district_name: 'Raigad',
                filing_date: '2007-01-29',
                first_hearing_date: '2007-02-02',
                name: 'Ashok Sudam Ahire 1',
                nature_of_disposal: 'Contested--JUDGMENT',
                oparty: 'Bayobai Kashinath Patil',
                registration_date: '2007-01-29',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: '---',
                under_sections: '---'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                address: 'Wadkhal Tal Pen',
                case_category: 'criminal',
                case_number: '204706000112011',
                case_year: '2011',
                cnr: 'MHRG060001312011',
                court_name: '---',
                district_name: 'Raigad',
                filing_date: '0000-00-00',
                first_hearing_date: '2012-08-16',
                name: 'Ashok Sudam Ahire',
                next_hearing_date: '2014-10-29',
                oparty: 'Bayobai Kashinath Patil',
                purpose_of_hearing: "Stayed by Hon'ble High Court",
                registration_date: '2011-06-09',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Civil Procedure codes',
                under_sections: '0000'
              },
              {
                algorithm_risk: 'average risk',
                father_match_type: 'NO_MATCH',
                name_match_type: 'PARTIAL_FUZZY',
                case_category: 'civil',
                case_number: '238000000882017',
                case_status: 'Pending',
                case_year: '2017',
                cnr: 'MHLC240002302017',
                district_name: 'Maharashtra Industrial and Lab',
                filing_date: '2017-09-15',
                first_hearing_date: '2017-10-27',
                name: 'Siddhant Ashok Acharya  Achare',
                next_hearing_date: '2018-01-02',
                oparty: 'Shakuntala Vasant Acharya  Achare',
                purpose_of_hearing: ' Written Statement',
                registration_date: '2017-09-20',
                source: 'ecourt',
                state_name: 'Maharashtra',
                type: 1,
                under_acts: 'Workmens Compensation Act, 1923',
                under_sections: '3and4'
              }
            ]
          }
        },

        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: null,
        status_code: 422,
        success: false,
        message: 'Internal Server Error',
        message_code: null
      }
    }
  },
  corporate_gstin: {
    success: {
      data: {
        data: {
          address_details: {},
          client_id: 'corporate_gstin_hemuprVyNGvtQAvRJHXy',
          gstin: '08AKWPJ1234H1ZN',
          pan_number: 'AKWPJ1234H',
          business_name: 'MINDA MARWAR PRODUCER COMPANY',
          legal_name: 'MADAN LAL JAT',
          center_jurisdiction:
            'Commissionerate - JODHPUR,Division - GST DIVISION',
          state_jurisdiction: 'State - Rajasthan,Zone',
          date_of_registration: '2021-10-20',
          constitution_of_business: 'Proprietorship',
          taxpayer_type: 'Regular',
          gstin_status: 'Active',
          date_of_cancellation: '1800-01-01',
          field_visit_conducted: 'No',
          nature_bus_activities: ['Retail Business', 'Wholesale Business'],
          nature_of_core_business_activity_code: 'NA',
          nature_of_core_business_activity_description: 'NA',
          aadhaar_validation: 'Yes',
          aadhaar_validation_date: '2021-10-20',
          filing_status: [],
          address: 'MINDA NAVA, WARD NO. 15, VILL. BHEEVPURA',
          hsn_info: {},
          filing_frequency: []
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          address_details: {},
          client_id: 'corporate_gstin_HIvlvWHedktKajhzlcTs',
          gstin: '08AKWPJ1234H1ZN',
          pan_number: null,
          business_name: null,
          legal_name: null,
          center_jurisdiction: null,
          state_jurisdiction: null,
          date_of_registration: null,
          constitution_of_business: null,
          taxpayer_type: null,
          gstin_status: null,
          date_of_cancellation: null,
          field_visit_conducted: null,
          nature_bus_activities: [],
          nature_of_core_business_activity_code: null,
          nature_of_core_business_activity_description: null,
          aadhaar_validation: null,
          aadhaar_validation_date: null,
          filing_status: [],
          address: null,
          hsn_info: {},
          filing_frequency: []
        },
        status_code: 422,
        success: false,
        message: 'Invalid GSTIN',
        message_code: null
      }
    }
  },
  credit_report: {
    success: {
      data: {
        data: {
          client_id: 'credit_report_v2_umOnUcqlxqevWQtIGHXQ',
          id_number: '********5514',
          id_type: 'aadhaar',
          mobile: '8079012345',
          name: 'Vishal Rathore',
          credit_score: '799',
          credit_report: {
            InquiryResponseHeader: {
              ClientID: 'randomClientID987',
              CustRefField: '654321',
              ReportOrderNO: '98765432',
              ProductCode: ['CREDRPT'],
              SuccessCode: '2',
              Date: '2023-11-20',
              Time: '12:45:30'
            },
            InquiryRequestInfo: {
              InquiryPurpose: '01',
              FirstName: 'JOHN DOE',
              InquiryAddresses: [
                {
                  seq: '2',
                  AddressType: ['O'],
                  AddressLine1: '123 Main Street',
                  State: 'CA',
                  Postal: '90210'
                }
              ],
              InquiryPhones: [
                {
                  seq: '1',
                  PhoneType: ['M'],
                  Number: '9876543210'
                }
              ],
              IDDetails: [
                {
                  seq: '1',
                  IDType: 'P',
                  IDValue: 'ABCDE1234F',
                  Source: 'Inquiry'
                },
                {
                  seq: '3',
                  IDType: 'D',
                  Source: 'Inquiry'
                },
                {
                  seq: '5',
                  IDType: 'A',
                  Source: 'Inquiry'
                }
              ],
              DOB: '1990-05-15'
            },
            Score: [
              {
                Type: 'FICO',
                Version: '5.0'
              }
            ],
            CCRResponse: {
              Status: '0',
              CIRReportDataLst: [
                {
                  InquiryResponseHeader: {
                    CustomerCode: 'CUSTOMER001',
                    CustRefField: '654321',
                    ReportOrderNO: '98765432',
                    ProductCode: ['CREDRPT'],
                    SuccessCode: '0',
                    Date: '2023-11-20',
                    Time: '12:45:30',
                    HitCode: '20',
                    CustomerName: 'ACME Corp'
                  },
                  InquiryRequestInfo: {
                    InquiryPurpose: 'Credit',
                    FirstName: 'JOHN DOE',
                    InquiryAddresses: [
                      {
                        seq: '2',
                        AddressType: ['O'],
                        AddressLine1: '123 Main Street',
                        State: 'CA',
                        Postal: '90210'
                      }
                    ],
                    InquiryPhones: [
                      {
                        seq: '1',
                        PhoneType: ['M'],
                        Number: '9876543210'
                      }
                    ],
                    IDDetails: [
                      {
                        seq: '1',
                        IDType: 'P',
                        IDValue: 'ABCDE1234F',
                        Source: 'Inquiry'
                      }
                    ],
                    DOB: '1990-05-15'
                  },
                  Score: [
                    {
                      Type: 'FICO',
                      Version: '5.0'
                    }
                  ],
                  CIRReportData: {
                    IDAndContactInfo: {
                      PersonalInfo: {
                        Name: {
                          FullName: 'JOHN DOE',
                          FirstName: 'JOHN',
                          LastName: 'DOE'
                        },
                        AliasName: {},
                        DateOfBirth: '1990-05-15',
                        Gender: 'Male',
                        Age: {
                          Age: '33'
                        },
                        PlaceOfBirthInfo: {}
                      },
                      IdentityInfo: {
                        PANId: [
                          {
                            seq: '1',
                            ReportedDate: '2015-07-31',
                            IdNumber: 'ABCDE1234F'
                          }
                        ],
                        Passport: [
                          {
                            seq: '1',
                            ReportedDate: '2015-07-31',
                            IdNumber: 'P1234567'
                          }
                        ]
                      },
                      AddressInfo: [
                        {
                          Seq: '2',
                          ReportedDate: '2015-07-31',
                          Address: '789 Pine Street',
                          State: 'CA',
                          Postal: '90210',
                          Type: 'Office'
                        },
                        {
                          Seq: '1',
                          ReportedDate: '2015-07-31',
                          Address: '123 Main Street',
                          State: 'CA',
                          Postal: '90210',
                          Type: 'Primary'
                        }
                      ],
                      PhoneInfo: [
                        {
                          seq: '2',
                          typeCode: 'H',
                          ReportedDate: '2015-07-31',
                          Number: '9879876543'
                        }
                      ],
                      EmailAddressInfo: [
                        {
                          seq: '1',
                          ReportedDate: '2015-07-31',
                          Email: 'john.doe@email.com'
                        }
                      ]
                    }
                  }
                },
                {
                  InquiryResponseHeader: {
                    CustomerCode: 'CUSTOMER002',
                    CustRefField: '789012',
                    ReportOrderNO: '34567890',
                    ProductCode: ['IDCR'],
                    SuccessCode: '1',
                    Date: '2023-11-19',
                    Time: '09:15:45',
                    HitCode: '15',
                    CustomerName: 'ABC Corporation'
                  },
                  InquiryRequestInfo: {
                    InquiryPurpose: 'Credit',
                    FirstName: 'ALICE JOHNSON',
                    InquiryAddresses: [
                      {
                        seq: '3',
                        AddressType: ['O'],
                        AddressLine1: '789 Pine Street',
                        State: 'CA',
                        Postal: '90210'
                      }
                    ],
                    InquiryPhones: [
                      {
                        seq: '2',
                        PhoneType: ['H'],
                        Number: '9879876543'
                      }
                    ],
                    IDDetails: [
                      {
                        seq: '2',
                        IDType: 'A',
                        IDValue: 'XYZAB1234C',
                        Source: 'Inquiry'
                      }
                    ],
                    DOB: '1987-12-15'
                  },
                  Score: [
                    {
                      Type: 'FICO',
                      Version: '8.0'
                    }
                  ],
                  CIRReportData: {
                    IDAndContactInfo: {
                      PersonalInfo: {
                        Name: {
                          FullName: 'ALICE JOHNSON',
                          FirstName: 'ALICE',
                          LastName: 'JOHNSON'
                        },
                        AliasName: {},
                        DateOfBirth: '1987-12-15',
                        Gender: 'Female',
                        Age: {
                          Age: '35'
                        },
                        PlaceOfBirthInfo: {}
                      },
                      IdentityInfo: {
                        PANId: [
                          {
                            seq: '2',
                            ReportedDate: '2016-02-28',
                            IdNumber: 'XYZAB1234C'
                          }
                        ],
                        Passport: [
                          {
                            seq: '2',
                            ReportedDate: '2016-02-28',
                            IdNumber: 'P9876543'
                          }
                        ]
                      },
                      AddressInfo: [
                        {
                          Seq: '2',
                          ReportedDate: '2016-02-28',
                          Address: '789 Pine Street',
                          State: 'CA',
                          Postal: '90210',
                          Type: 'Office'
                        }
                      ],
                      PhoneInfo: [
                        {
                          seq: '2',
                          typeCode: 'H',
                          ReportedDate: '2016-02-28',
                          Number: '9879876543'
                        }
                      ]
                    }
                  }
                }
              ],
              status_code: 200,
              success: true,
              message: 'Success',
              message_code: 'success'
            }
          },
          credit_report_link: ''
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'credit_report_v2_PTNzvmpKROxbBrRDdrjz',
          id_number: '********5514',
          id_type: 'aadhaar',
          mobile: '8079012345',
          name: 'Vishal Rathore',
          credit_score: '',
          credit_report: {},
          credit_report_link: ''
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  credit_report_pdf: {
    success: {
      data: {
        data: {
          client_id: 'credit_report_v2_pdf_ywWaXdhazoIEjbpPuvqc',
          id_number: '********5514',
          id_type: 'aadhaar',
          mobile: '8079012345',
          name: 'Vishal Rathore',
          credit_score: '799',
          credit_report: {},
          credit_report_link:
            'https://aadhaar-kyc-docs.s3.amazonaws.com/vishal.rathore/credit_report_v2/credit_reporure=568a2c563ec24f24fe3a6a03ce3180a888b27091d1e55d8a7562fd06247f3693'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'credit_report_v2_pdf_YygamLlwrYijpaauUbsl',
          id_number: '********5514',
          id_type: 'aadhaar',
          mobile: '8079012345',
          name: 'Vishal Rathore',
          credit_score: '',
          credit_report: {},
          credit_report_link: ''
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  credit_report_v2: {
    success: {
      data: {
        data: {
          pan: null,
          mobile: '9370254216',
          name: 'ASHOK JADHAV',
          pdf_url:
            'https://aadhaar-kyc-docs.s3.amazonaws.com/vishal.rathore/credit_report_v2/credit_reporure=568a2c563ec24f24fe3a6a03ce3180a888b27091d1e55d8a7562fd06247f3693'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'credit_report_v2_pdf_YygamLlwrYijpaauUbsl',
          id_number: '********5514',
          id_type: 'aadhaar',
          mobile: '8079012345',
          name: 'Vishal Rathore',
          credit_score: '',
          credit_report: {},
          credit_report_link: ''
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  director_phone: {
    success: {
      data: {
        data: {
          client_id: 'director_phone_oxjmjVHbVouynMCmjptC',
          din_number: '00000000',
          phone_number: '+91900000000000'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'director_phone_VCnqlwaZLcNhydxgsWio',
          din_number: '00000000',
          phone_number: null
        },
        status_code: 422,
        success: false,
        message: 'invalid_or_inactive',
        message_code: null
      }
    }
  },
  ecourt_cnr: {
    success: {
      data: {
        data: {
          client_id: 'ecourt_cnr_search_hRguiuMgammwvWcqpuom',
          cnr_number: 'CHCH0100123456789',
          cnr_details: {
            case_details: {
              case_type: 'CRA',
              filing_number: '192/2000',
              filing_date: '2000-00-06',
              registration_number: '3000/2000',
              registration_date: '2000-00-07'
            },
            case_status: {
              first_hearing_date: '2000-00-07',
              next_hearing_date: '2000-11-02',
              case_stage: 'Defence evidence ',
              court_number_and_judge: 'District Judge',
              decision_date: null,
              nature_of_disposal: ''
            },
            petitioner_and_advocate_details: {
              petitioner: 'K AGGARWAL',
              advocate: 'V Jain'
            },
            respondent_and_advocate_details: [
              'INCOME  OFFICER',
              'UNION TERRITORY',
              'CORPORATION ITD',
              'N AGGARWAL',
              'P AGGARWAL',
              'P SINGH'
            ],
            act_details: [
              {
                under_act: 'Cr. P.C.',
                under_section: '374'
              }
            ],
            subordinate_court_information_details: {
              case_number_and_year: '0001000 -  2019',
              case_decision_date: '2000-00-08'
            },
            case_history_details: [
              {
                judge: 'District Judge',
                business_on_date: '2000-00-07',
                hearing_date: '2000-00-02',
                purpose_of_hearing: 'Defence evidence'
              }
            ],
            interim_orders_details: [
              {
                order_number: '1',
                order_date: '2000-00-07'
              }
            ],
            final_orders_and_judgements_details: [],
            case_transfer_and_establishment_details: [],
            process_details: [
              {
                process_id: 'PCHCH01000987654000_1_1',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_2',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_3',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_4',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_5',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_1_6',
                process_data: '2000-07-00',
                process_title: 'Notice to Respondent.'
              },
              {
                process_id: 'PCHCH01000987654000_2_1',
                process_data: '2000-07-00',
                process_title: 'Docket Calling.'
              }
            ]
          }
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'ecourt_cnr_search_HxMPvyByitraxVlkkjoD',
          cnr_number: 'APAS020001080000',
          cnr_details: {}
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  electricity_bill: {
    success: {
      data: {
        data: {
          client_id: 'electricity_jBxiqjAGXuymlqlbrOOb',
          customer_id: '17000346322745',
          operator_code: 'MH',
          state: 'maharashtra',
          full_name: 'SUKHWANI',
          address: 'COLONY SOLAPUR ROAD NR LAD GIRNI SHEWALWADI 412307',
          mobile: null,
          user_email: null,
          bill_amount: '1,280.00',
          bill_number: null,
          document_link: null
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: null,
          customer_id: '17000346322745',
          operator_code: 'MH',
          state: 'maharashtra',
          full_name: null,
          address: null,
          mobile: null,
          user_email: null,
          bill_amount: null,
          bill_number: null,
          document_link: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  employment_history_uan: {
    success: {
      data: {
        data: {
          client_id: 'employment_history_uan_aueTsCLbIqUDULtEFwZU',
          uan: '111779821234',
          employment_history: [
            {
              name: 'Munna Bhbaiya',
              guardian_name: 'Kaleen Bhaiya',
              establishment_name: 'I PROCESS SERVICES (INDIA) PVT. LTD.',
              member_id: 'KDMAL004123654000313079',
              date_of_joining: '2021-03-15',
              date_of_exit: null,
              last_pf_submitted: '2022-06-14',
              wage_month: 'May-2022'
            }
          ]
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'employment_history_uan_owsYxXfJqptbCdfxxjxw',
          uan: '101669821230',
          employment_history: []
        },
        status_code: 422,
        success: false,
        message: 'No Employment Record Found.',
        message_code: null
      }
    }
  },
  fastag_rc: {
    success: {
      data: {
        data: {
          client_id: 'fastag_to_rc_OPartnFuEJMAwiUTWbsA',
          fastag_id: '34161FA123456EE81E41EAE0',
          rc_number: 'GJ05XX1234',
          tag_status: 'ACTIVE',
          vehicle_class: 'VC4',
          issue_date: '2022-10-20',
          issuer_bank: 'IDFC Bank'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'fastag_to_rc_CWBFxWWjVtHZZdjMmwnk',
          fastag_id: '34161FA123456EE81E41EAE0',
          rc_number: null,
          tag_status: null,
          vehicle_class: null,
          issue_date: null,
          issuer_bank: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  fastag_verification: {
    success: {
      data: {
        data: {
          client_id: 'fastag_verification_dRKBysWbCksWhLlUpdrx',
          rc_number: 'GJ05CN0000',
          bank_name: 'IDFC First Bank',
          tag_id: '0000FA00008EE81FCA123',
          status: 'Active'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'fastag_verification_YcAxegLbwcnndbpXnCow',
          rc_number: 'GJ05CN0000',
          bank_name: null,
          tag_id: null,
          status: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  find_upi_id: {
    success: {
      data: {
        data: {
          client_id: 'find_upi_btYgGDVllvsuKxccKofh',
          mobile_number: '1234567890',
          upi_id: 'xyz123@ybl'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'find_upi_aRwaCnnibJvbBespVmVz',
          mobile_number: '1234567890',
          upi_id: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  mobile_number_rc: {
    success: {
      data: {
        data: {
          client_id: 'mobile_number_to_rc_ubFojfkItBiHxioFbzJz',
          rc_number: ['RJ14XJ1234'],
          mobile_number: '8908885858'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'mobile_number_to_rc_oeVUKwQlHnUjgVGlNjtl',
          rc_number: [],
          mobile_number: '8908885858'
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  mobile_to_bank: {
    success: {
      data: {
        data: {
          client_id: 'mobile_to_bank_details_NkSxYeGblpzYhwMBbirH',
          bank_ifsc: 'UTIB0001234',
          bank_account_no: '92001006123456789',
          bank_details: 'AXIS BANK, JAIPUR',
          name: 'VISHAL RATHORE'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'mobile_to_bank_details_votfuQkijjwnuYepgebj',
          bank_ifsc: null,
          bank_account_no: null,
          bank_details: null,
          name: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  pan_to_uan: {
    success: {
      data: {
        data: {
          client_id: 'pan_to_uan_hoadKOGjFSjwnS',
          pan_number: 'XXXXX1234X',
          uan_number: '123456789'
        },
        message_code: 'success',
        success: true,
        message: null,
        status: 200
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'pan_to_uan_rkmoXxozWLIhomgKBpqu',
          pan_number: 'XXXX1234XXXX',
          uan_number: ''
        },
        status_code: 422,
        success: false,
        message: 'Invalid PAN Number provided',
        message_code: 'invalid_pan'
      }
    }
  },
  passport: {
    success: {
      data: {
        data: {
          date_of_application: '2017-07-24',
          file_number: 'DL1061291XXXXXX',
          client_id: 'passport_rfqevMkcqenNPushfhfM',
          full_name: 'MUNNA BHAIYA',
          passport_number: 'S2420000',
          dob: '1990-01-01'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          date_of_application: null,
          file_number: 'DL1061291XXXXXX',
          client_id: null,
          full_name: null,
          passport_number: null,
          dob: '1990-01-01'
        },
        status_code: 422,
        success: false
      }
    }
  },
  rc_number_mobile: {
    success: {
      data: {
        data: {
          client_id: 'rc_to_mobile_number_WmrcRThlcmadfhblXtvQ',
          rc_number: 'RJ14XJ1234',
          mobile_number: '8890856565'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'rc_to_mobile_number_QjCgmrETvYbHqPLvcZjv',
          rc_number: 'RJ14XJ1234',
          mobile_number: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  ration_card: {
    success: {
      data: {
        data: {
          client_id: 'ration_card_LqcwSxyPrnrKsnJjRwaD',
          id_number: '10140100006004000005',
          state_portal: 'central',
          state_name: 'BIHAR',
          district_name: 'MUZAFFARPUR',
          fps_id: '121600100663',
          scheme_name: 'PHH',
          dup_uid_status: 'No',
          member_details_list: [
            {
              member_id: '1014010000600400000501',
              member_name: 'JAVANTI DEVI',
              uid_status: true,
              masked_aadhaar: null,
              relationship_name: 'SELF'
            },
            {
              member_id: '1014010000600400000502',
              member_name: 'RAMLAKSHAN RAI',
              uid_status: true,
              masked_aadhaar: null,
              relationship_name: 'NOT AVAILABLE'
            },
            {
              member_id: '1014010000600400000504',
              member_name: 'SAJAN KUMAR',
              uid_status: true,
              masked_aadhaar: null,
              relationship_name: 'SON'
            },
            {
              member_id: '1014010000600400000505',
              member_name: 'VIRSAN KUMAR',
              uid_status: true,
              masked_aadhaar: null,
              relationship_name: 'SON'
            }
          ]
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'ration_card_uxzWHzSaOtxwqqvNbDlJ',
          id_number: '10140100006004000000',
          state_portal: 'central',
          state_name: null,
          district_name: null,
          fps_id: null,
          scheme_name: null,
          dup_uid_status: null,
          member_details_list: []
        },
        status_code: 422,
        success: false,
        message: 'Invalid Ration Card Number',
        message_code: 'verification_error'
      }
    }
  },
  tan: {
    success: {
      data: {
        data: {
          client_id: 'tan_kjYdJwRvRJQszuvgdruK',
          tan: 'RTKT06731E',
          name: 'TAXREX SOLUTIONS PRIVATE LIMITED'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'tan_aVnCmDGrVzzickktvtyO',
          tan: 'RTKT06731Z',
          name: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: null
      }
    }
  },
  tan_search: {
    success: {
      data: {
        data: {
          client_id: 'tan_company_search_MrZzXqGKYgZoewbEymGS',
          search_company_name: 'ABC PRIVATE LIMITED',
          search_size: 10,
          search_state: 'DELHI',
          exact_match: true,
          hits: 1,
          search_data: [
            {
              tan: 'DELS71234E',
              company_name: 'ABC PRIVATE LIMITED'
            }
          ]
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'null',
          search_company_name: 'ABC PRIVATE LIMITED',
          search_size: 10,
          search_state: 'DELHI',
          exact_match: true,
          hits: 1,
          search_data: null
        },
        status_code: 422,
        success: false,
        message: 'No Macth Found',
        message_code: null
      }
    }
  },
  telecom_verification: {
    success: {
      data: {
        data: {
          client_id: 'telecom_verification_TEMsLgQPzcOnripjzkph',
          mobile_number: '910000000',
          is_valid: true,
          operator: 'jio',
          circle: 'Rajasthan'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'telecom_verification_srJxnpvabOjxTYgJSwdQ',
          mobile_number: '1234567897',
          is_valid: false,
          operator: null,
          circle: null
        },
        status_code: 422,
        success: false,
        message: 'Invalid Mobile Number',
        message_code: 'verification_failed'
      }
    }
  },
  tin_verification: {
    success: {
      data: {
        data: {
          client_id: 'tin_verification_bZNrBkyzCMfOfkqteenz',
          tin_number: '12345678915',
          cst_number: '12345678915',
          dealer_name: 'RAM PERFURMERWORKS',
          dealer_address: 'PLOT NO-XX-21',
          state_name: 'Odisha',
          pan_number: 'NOT AVAILABLE',
          registration_date: '1992-12-16',
          valid_upto: '2013-07-20',
          registration_status: 'Cancelled'
        },
        status_code: 200,
        success: true,
        message: 'Success',
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'tin_verification_ciAiGJyyprlyusskNpzq',
          tin_number: '12345678915',
          cst_number: null,
          dealer_name: null,
          dealer_address: null,
          state_name: null,
          pan_number: null,
          registration_date: null,
          valid_upto: null,
          registration_status: null
        },
        status_code: 422,
        success: false,
        message: 'Verification Failed.',
        message_code: 'verification_failed'
      }
    }
  },
  udyog_aadhaar: {
    success: {
      data: {
        data: {
          client_id: 'uan_ANxqiNhrnwBbYwysUEvh',
          uan: 'UDYAM-GJ-25-000000',
          certificate_url: '',
          main_details: {
            enterprise_type_list: [
              {
                classification_year: '2023-24',
                enterprise_type: 'Micro',
                classification_date: '2023-05-09'
              },
              {
                classification_year: '2022-23',
                enterprise_type: 'Micro',
                classification_date: '2022-06-26'
              },
              {
                classification_year: '2021-22',
                enterprise_type: 'Micro',
                classification_date: '2022-04-16'
              }
            ],
            name_of_enterprise: ' INDUSTRIES',
            major_activity: 'Manufacturing',
            social_category: 'General',
            date_of_commencement: '2012-10-17',
            dic_name: 'XXXXXX',
            state: 'AAAAAA',
            applied_date: '2022-04-16',
            flat: '106/9',
            name_of_building: '3RD PHASE',
            road: 'XXXXX',
            village: 'XXXXX',
            block: 'NA',
            city: 'VAPI',
            pin: 'XXXXX',
            mobile_number: 'XX*****XXX',
            email: 'XXXXXXXXX@GMAIL.COM',
            organization_type: 'Proprietary',
            gender: 'Male',
            date_of_incorporation: '0000-10-17',
            msme_dfo: 'XXXXXXX',
            registration_date: '00000-04-16'
          },
          location_of_plant_details: [
            {
              unit_name: 'XX*************XX',
              line_1: 'C-104, 14/3',
              building: 'XXXXXXXXXX SOCIETY',
              village: 'XXX',
              street: '',
              road: 'BEHIND AAAAA COLLEGE',
              city: 'AAAAA',
              pin: '000000',
              state: 'AAAAAA',
              district: 'AAAAA'
            },
            {
              unit_name: 'ABCD INDUSTRIES',
              line_1: '106/9',
              building: '3RD ',
              village: 'MILLS LTD',
              street: '',
              road: 'ABCD',
              city: 'ABCd',
              pin: '000000',
              state: 'ABCD',
              district: 'YYYYYY'
            }
          ],
          nic_code: [
            {
              nic_2_digit: ' 0; management consultancy activities',
              nic_4_digit: 'Management consultancy activities',
              nic_5_digit: 'Management consultancy activities',
              activity_type: 'Services',
              added_on: '0000-04-16'
            },
            {
              nic_2_digit: '0: machinery and equipment',
              nic_4_digit: '2599 -  of other fabricate n.e.c.',
              nic_5_digit:
                '25999 - Manufacture of other fabricated metal products n.e.c.',
              activity_type: 'Manufacturing',
              added_on: '0000-04-16'
            }
          ]
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'uan_FplbWroiZmroDfRWcblY',
          uan: 'UDYAM-GJ-25-00000000',
          certificate_url: '',
          main_details: {},
          location_of_plant_details: [],
          nic_code: []
        },
        status_code: 422,
        success: false,
        message: 'Invalid UAN.',
        message_code: 'verification_failed'
      }
    }
  },
  echallan: {
    success: {
      data: {
        data: {
          client_id: 'rc_related_UgaxohwEraUGgovAugEF',
          challan_details: {
            challans: [
              {
                number: 1,
                challan_number: 'DL112345678978',
                offense_details: 'Disobeying Lawful Directions',
                challan_place: null,
                challan_date: '2024-01-25',
                state: 'DL',
                rto: null,
                upstream_code: 'CENTRAL',
                accused_name: 'MUNNA BHAIYA',
                amount: 19500,
                challan_status: 'Pending',
                court_challan: true
              },
              {
                number: 2,
                challan_number: 'DL12345698789',
                offense_details: 'Allowing Unauthorised Person To Drive',
                challan_place: null,
                challan_date: '2023-11-25',
                state: 'DL',
                rto: null,
                upstream_code: 'CENTRAL',
                accused_name: 'KALEEN BHAIYA',
                amount: 15000,
                challan_status: 'Pending',
                court_challan: true
              },
              {
                number: 1,
                challan_number: '12345678',
                offense_details: 'OVER SPEED (Light Motor Vehicle)',
                challan_place: 'MIRZAPUR',
                challan_date: '2023-11-26',
                state: 'DL',
                rto: null,
                upstream_code: 'DL1',
                accused_name: 'GUDDU BHAIYA',
                amount: 2000,
                challan_status: null,
                court_challan: null
              },
              {
                number: 2,
                challan_number: '123456',
                offense_details: 'Violating stop line',
                challan_place: 'LODHI ROAD',
                challan_date: '2022-08-03',
                state: 'DL',
                rto: null,
                upstream_code: 'DL1',
                accused_name: 'RATI SHANKAR SHUKLA',
                amount: 500,
                challan_status: null,
                court_challan: null
              }
            ],
            blacklist: []
          }
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'uan_FplbWroiZmroDfRWcblY',
          uan: 'UDYAM-GJ-25-00000000',
          certificate_url: '',
          main_details: {},
          location_of_plant_details: [],
          nic_code: []
        },
        status_code: 422,
        success: false,
        message: 'Invalid UAN.',
        message_code: 'verification_failed'
      }
    }
  },
  aadhaar_pan_link: {
    success: {
      data: {
        data: {
          client_id: 'aadhaar_pan_link_check_ozWwDzcLVvotLwjyuiwq',
          masked_pan: 'EKXXXXXX6F',
          linking_status: true,
          reason: 'linked',
          detailed_reason: null
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          client_id: 'aadhaar_pan_link_check_pqbhhlAHfoWwfdbZdqkT',
          masked_pan: '',
          linking_status: false,
          reason: 'invalid_aadhaar',
          detailed_reason: null
        },
        status_code: 422,
        success: false,
        message: 'Invalid Aadhaar Number',
        message_code: 'verification_failed'
      }
    }
  },
  aadhaar_uan_link: {
    success: {
      data: {
        data: {
          aadhaar_number: '445905879514',
          client_id: 'aadhaar_to_uan_pvwoRJHGqcfpihFgrppF',
          pf_uan: '101667814011'
        },
        status_code: 200,
        success: true,
        message: null,
        message_code: 'success'
      }
    },
    failure: {
      data: {
        data: {
          aadhaar_number: '445905879514',
          client_id: null,
          pf_uan: null
        },
        status_code: 422,
        success: false,
        message: 'Invalid Aadhaar Number',
        message_code: 'verification_failed'
      }
    }
  }
}

module.exports = MOCK_RESPONSES
