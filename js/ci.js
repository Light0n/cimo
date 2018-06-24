// logic for CI - clothes import
var start_g = 0;
var ciArr = [];
Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

function addCi(){
  if(document.getElementById('formCi').reportValidity()){// form validation check
    var start = document.getElementById('startNumber');
    if(start_g === 0){ // first add
      // disable start input
      start.disabled = true;
    }
    var repeat = document.getElementById('repeat').value;
    var content = '';
    var customerId = document.getElementById('customerId').value;
    var dateCi = document.getElementById('date').value;
    var category = document.getElementById('category').value;
    var price = document.getElementById('price').value;
    
    for(var i=0; i<repeat;i++){
      ciArr.push([Number(start.value)+i,category,price]);
      content += `<tr>
      <th scope="row">${customerId}</th>
      <td>${dateCi}</td>
      <td>${Number(start.value)+i}</td>
      <td>${category}</td>
      <td>${price}k</td>
      <td>
        <button class="btn-danger deleteBtn">Delete</button>
        <button class="btn-info reprintBtn">Reprint</button>
      </td>
    </tr>`; 
    }
    document.getElementById('tableCi').getElementsByTagName('tbody')[0].innerHTML += content;
    // update global start
    start_g = Number(start.value) + Number(repeat);
    // update startNumber view;
    start.value = start_g;
  }
}

function printAll(){
  var customerId = document.getElementById('customerId').value;
  var dateArr = document.getElementById('date').value.split('-'); // [yyyy,mm,dd]
  var category = document.getElementById('category').value;

  var labelXml = `<?xml version="1.0" encoding="utf-8"?>
  <DieCutLabel Version="8.0" Units="twips" MediaType="Default">
    <PaperOrientation>Landscape</PaperOrientation>
    <Id>Small30336</Id>
    <IsOutlined>false</IsOutlined>
    <PaperName>30336 1 in x 2-1/8 in</PaperName>
    <DrawCommands>
      <RoundRectangle X="0" Y="0" Width="1440" Height="3060" Rx="180" Ry="180" />
    </DrawCommands>
    <ObjectInfo>
      <BarcodeObject>
        <Name>BARCODE</Name>
        <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
        <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
        <LinkedObjectName />
        <Rotation>Rotation0</Rotation>
        <IsMirrored>False</IsMirrored>
        <IsVariable>True</IsVariable>
        <GroupID>-1</GroupID>
        <IsOutlined>False</IsOutlined>
        <Text>31120001</Text>
        <Type>Code128C</Type>
        <Size>Medium</Size>
        <TextPosition>Bottom</TextPosition>
        <TextFont Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />
        <CheckSumFont Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />
        <TextEmbedding>None</TextEmbedding>
        <ECLevel>0</ECLevel>
        <HorizontalAlignment>Center</HorizontalAlignment>
        <QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" />
      </BarcodeObject>
      <Bounds X="175" Y="117" Width="1916" Height="1241" />
    </ObjectInfo>
    <ObjectInfo>
      <TextObject>
        <Name>TEXT</Name>
        <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
        <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
        <LinkedObjectName />
        <Rotation>Rotation90</Rotation>
        <IsMirrored>False</IsMirrored>
        <IsVariable>False</IsVariable>
        <GroupID>-1</GroupID>
        <IsOutlined>False</IsOutlined>
        <HorizontalAlignment>Center</HorizontalAlignment>
        <VerticalAlignment>Top</VerticalAlignment>
        <TextFitMode>AlwaysFit</TextFitMode>
        <UseFullFontHeight>True</UseFullFontHeight>
        <Verticalized>False</Verticalized>
        <StyledText>
          <Element>
            <String xml:space="preserve">BH0789-A
  </String>
            <Attributes>
              <Font Family="Arial" Size="24" Bold="False" Italic="False" Underline="False" Strikeout="False" />
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />
            </Attributes>
          </Element>
          <Element>
            <String xml:space="preserve"> 
  </String>
            <Attributes>
              <Font Family="Arial Rounded MT" Size="24" Bold="False" Italic="False" Underline="False" Strikeout="False" />
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />
            </Attributes>
          </Element>
        </StyledText>
      </TextObject>
      <Bounds X="2155" Y="57" Width="820.999999999999" Height="1301" />
    </ObjectInfo>
    <ObjectInfo>
      <TextObject>
        <Name>TEXT_1</Name>
        <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
        <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
        <LinkedObjectName />
        <Rotation>Rotation90</Rotation>
        <IsMirrored>False</IsMirrored>
        <IsVariable>False</IsVariable>
        <GroupID>-1</GroupID>
        <IsOutlined>False</IsOutlined>
        <HorizontalAlignment>Center</HorizontalAlignment>
        <VerticalAlignment>Top</VerticalAlignment>
        <TextFitMode>ShrinkToFit</TextFitMode>
        <UseFullFontHeight>True</UseFullFontHeight>
        <Verticalized>False</Verticalized>
        <StyledText>
          <Element>
            <String xml:space="preserve">100K</String>
            <Attributes>
              <Font Family="Calibri" Size="36" Bold="True" Italic="False" Underline="False" Strikeout="False" />
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />
            </Attributes>
          </Element>
        </StyledText>
      </TextObject>
      <Bounds X="2440" Y="57" Width="476" Height="1301" />
    </ObjectInfo>
  </DieCutLabel>`;
  //print from file
  var label = DYMO.Label.Framework.Label.Open("../label/cimo.label");

  // var label = dymo.label.framework.openLabelXml(labelXml);
 // create label set to print data
 var labelSetBuilder = new dymo.label.framework.LabelSetBuilder();

  ciArr.forEach(function(item){
    var barcode = dateArr[2]+dateArr[1]+(item[0]).pad(4);
    var custumerIDandItemType = customerId+ '-' + item[1];
    var price = item[2]+'k';

    var record = labelSetBuilder.addRecord();
    record.setText("BARCODE", barcode);
    record.setText("TEXT", custumerIDandItemType);
    record.setText("TEXT_1", price);
  });
  
  try{
    // select printer to print on
    // for simplicity sake just use the first LabelWriter printer
    var printers = dymo.label.framework.getPrinters();
    if (printers.length == 0)
        throw "No DYMO printers are installed. Install DYMO printers.";

    var printerName = "";
    for (var i = 0; i < printers.length; ++i)
    {
        var printer = printers[i];
        if (printer.printerType == "LabelWriterPrinter")
        {
            printerName = printer.name;
            break;
        }
    }
    
    if (printerName == "")
        throw "No LabelWriter printers found. Install LabelWriter printer";

    // finally print the label
    label.print(printerName, "", labelSetBuilder);
  }
  catch(e)
  {
    alert(e.message || e);
  }
}

document.getElementById('addBtn').addEventListener('click',addCi);
document.getElementById('printBtn').addEventListener('click',printAll);
